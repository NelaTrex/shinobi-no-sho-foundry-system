// Reference: https://github.com/foundryvtt/dnd5e/blob/4.1.x/module/documents/activity/mixin.mjs#L1212
// Reference: https://github.com/foundryvtt/dnd5e/blob/b6d3b4e46cdb70f09f5731bad04a363f3b5a7d0a/module/canvas/ability-template.mjs#L4
// Reference: https://gitlab.com/vizael/Tormenta20/-/blob/master/module/pixi/ability-template.mjs

/**
 * A helper class for building MeasuredTemplates for 5e spells and abilities
 */
export default class AbilityTemplate extends MeasuredTemplate {

  /**
   * Track the timestamp when the last mouse move event was captured.
   * @type {number}
   */
  #moveTime = 0;

  /* -------------------------------------------- */

  /**
   * Current token that is highlighted when using adjusted size template.
   * @type {Token5e}
   */
  #hoveredToken;

  /* -------------------------------------------- */

  /**
   * The initially active CanvasLayer to re-activate after the workflow is complete.
   * @type {CanvasLayer}
   */
  #initialLayer;

  /* -------------------------------------------- */

  /**
   * Track the bound event handlers so they can be properly canceled later.
   * @type {object}
   */
  #events;

  /* -------------------------------------------- */

  /**
	 * A factory method to create an AbilityTemplate instance using provided data from an Item5e instance
	 * @param {ItemShinobiNoSho} item               The Item object for which to construct the template
	 * @return {AbilityTemplate|null}     The template object, or null if the item does not produce a template
	 */
	static fromItem(item, templateData) {

		// Return the template constructed from the item data
		const cls = CONFIG.MeasuredTemplate.documentClass;
		const template = new cls(templateData, {parent: canvas.scene});
		const object = new this(template);
		object.item = item;
		object.actorSheet = item.actor?.sheet || null;
		return object;
	}


  /* -------------------------------------------- */

  /**
   * Creates a preview of the spell template.
   * @returns {Promise}  A promise that resolves with the final measured template if created.
   */
  drawPreview() {
    const initialLayer = canvas.activeLayer;

    // Draw the template and switch to the template layer
    this.draw();
    this.layer.activate();
    this.layer.preview.addChild(this);

    // Hide the sheet that originated the preview
    this.actorSheet?.minimize();

    // Activate interactivity
    return this.activatePreviewListeners(initialLayer);
  }

  /* -------------------------------------------- */

  /**
   * Activate listeners for the template preview
   * @param {CanvasLayer} initialLayer  The initially active CanvasLayer to re-activate after the workflow is complete
   * @returns {Promise}                 A promise that resolves with the final measured template if created.
   */
  activatePreviewListeners(initialLayer) {
    return new Promise((resolve, reject) => {
      this.#initialLayer = initialLayer;
      this.#events = {
        cancel: this._onCancelPlacement.bind(this),
        confirm: this._onConfirmPlacement.bind(this),
        move: this._onMovePlacement.bind(this),
        resolve,
        reject,
        rotate: this._onRotatePlacement.bind(this)
      };

      // Activate listeners
      canvas.stage.on("mousemove", this.#events.move);
      canvas.stage.on("mousedown", this.#events.confirm);
      canvas.app.view.oncontextmenu = this.#events.cancel;
      canvas.app.view.onwheel = this.#events.rotate;
    });
  }

  /* -------------------------------------------- */

  /**
   * Shared code for when template placement ends by being confirmed or canceled.
   * @param {Event} event  Triggering event that ended the placement.
   */
  async _finishPlacement(event) {
    this.layer._onDragLeftCancel(event);
    canvas.stage.off("mousemove", this.#events.move);
    canvas.stage.off("mousedown", this.#events.confirm);
    canvas.app.view.oncontextmenu = null;
    canvas.app.view.onwheel = null;
    if ( this.#hoveredToken ) {
      this.#hoveredToken._onHoverOut(event);
      this.#hoveredToken = null;
    }
    this.#initialLayer.activate();
    await this.actorSheet?.maximize();
  }

  /* -------------------------------------------- */

  /**
   * Move the template preview when the mouse moves.
   * @param {Event} event  Triggering mouse event.
   */
  _onMovePlacement(event) {
    event.stopPropagation();
    const now = Date.now(); // Apply a 20ms throttle
    if ( now - this.#moveTime <= 20 ) return;
    const center = event.data.getLocalPosition(this.layer);
    const updates = canvas.templates.getSnappedPoint(center);

    // Adjust template size to take hovered token into account if `adjustedSize` is set
		// TODO: DEFINE DIMENSIONS SIZE.
    const baseDistance = this.document.flags.shinobinosho?.dimensions?.size;
    if ( this.document.flags.dnd5e?.dimensions?.adjustedSize && baseDistance ) {
      const rectangle = new PIXI.Rectangle(center.x, center.y, 1, 1);
      const hoveredToken = canvas.tokens.quadtree.getObjects(rectangle, {
        collisionTest: ({ t }) => t.visible && !t.document.isSecret }).first();
      if ( hoveredToken && (hoveredToken !== this.#hoveredToken) ) {
        this.#hoveredToken = hoveredToken;
        this.#hoveredToken._onHoverIn(event);
        const size = Math.max(hoveredToken.document.width, hoveredToken.document.height);
        updates.distance = baseDistance + (size * canvas.grid.distance / 2);
      } else if ( !hoveredToken && this.#hoveredToken ) {
        this.#hoveredToken._onHoverOut(event);
        this.#hoveredToken = null;
        updates.distance = baseDistance;
      }
    }

    this.document.updateSource(updates);
    this.refresh();
    this.#moveTime = now;
  }

  /* -------------------------------------------- */

  /**
   * Rotate the template preview by 3˚ increments when the mouse wheel is rotated.
   * @param {Event} event  Triggering mouse event.
   */
  _onRotatePlacement(event) {
    if ( event.ctrlKey ) event.preventDefault(); // Avoid zooming the browser window
    event.stopPropagation();
    const delta = canvas.grid.type > CONST.GRID_TYPES.SQUARE ? 30 : 15;
    const snap = event.shiftKey ? delta : 5;
    const update = {direction: this.document.direction + (snap * Math.sign(event.deltaY))};
    this.document.updateSource(update);
    this.refresh();
  }

  /* -------------------------------------------- */

  /**
   * Confirm placement when the left mouse button is clicked.
   * @param {Event} event  Triggering mouse event.
   */
  async _onConfirmPlacement(event) {
    await this._finishPlacement(event);
    const destination = canvas.templates.getSnappedPoint({ x: this.document.x, y: this.document.y });
    this.document.updateSource(destination);
    this.#events.resolve(canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [this.document.toObject()]));
  }

  /* -------------------------------------------- */

  /**
   * Cancel placement when the right mouse button is clicked.
   * @param {Event} event  Triggering mouse event.
   */
  async _onCancelPlacement(event) {
    await this._finishPlacement(event);
    this.#events.reject();
  }

}