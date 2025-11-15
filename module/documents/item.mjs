import areaTemplateWindow from "../applications/areaTemplate.mjs";

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ShinobiItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();

  }
	
  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const rollData = { ...super.getRollData() };

    // Quit early if there's no parent actor
    if (!this.actor) return rollData;

    // If present, add the actor's roll data
    rollData.actor = this.actor.getRollData();

    return rollData;
  }

	/**
	 * Make calculations for area template.
	 *
	 * @param {Object} actorData The item to prepare.
	 *
	 * @return {undefined}
	 */
	_prepareTemplate(itemData){
		const data = itemData;
		if (data.type !== "tecnicas" && data.type !== "gerais" && data.type !== "armas") return;
		if (data?.system?.areaTemplate.length === 0 && !data.parent.system.abilities.esp.tbonus) return;
		const system = data.parent.system;

		for ( let area of data.system.areaTemplate) {
			if (area[3] === "porEspirito") area[4] = area[1] + area[2] * system.abilities.esp.tbonus;
			else if (area[3] === "porInteligencia") area[4] = area[1] + area[2] * system.abilities.int.tbonus;
			else if (area[3] === "porArte") area[4] = area[1] + area[2] * system.skills.geral.arte.total;
			else if (area[3] === "porLidarAnimais") area[4] = area[1] + area[2] * system.skills.geral.animais.total;
			else if (area[3] === "porMecanismos") area[4] = area[1] + area[2] * system.skills.geral.mecanismos.total;
			else if (area[3] === "porRastrear") area[4] = area[1] + area[2] * system.skills.geral.rastrear.total;
			else if (area[3] === "custom") area[4] = area[1] + (area[2] * area[5]);
		}
		this.render();
	}

	/**
	 * Prepare an object of chat data used to display a card for the Item in the chat log.
	 * @param {object} htmlOptions    Options used by the TextEditor.enrichHTML function.
	 * @returns {object}              An object of chat data to render.
	 */
	async getChatData(htmlOptions = {}) {
		const data = this.toObject().system;

		// Rich text description
		data.description = await TextEditor.enrichHTML(data.description, {
			relativeTo: this,
			rollData: this.getRollData(),
			...htmlOptions,
		});

		// Type specific properties
		// data.properties = [
		//   ...this.system.chatProperties ?? [],
		//   ...this.system.equippableItemChatProperties ?? [],
		//   ...this.system.activatedEffectChatProperties ?? []
		// ].filter(p => p);

		return data;
	}

	/**
	 * Apply listeners to chat messages.
	 * @param {HTML} html  Rendered chat message.
	 */
	static chatListeners(html) {
		html.on('click', '.card-buttons button', this._onChatCardAction.bind(this));
	}

	/**
	 * Handle execution of a chat card action via a click event on one of the card buttons
	 * @param {Event} event       The originating click event
	 * @returns {Promise}         A promise which resolves once the handler workflow is complete
	 * @private
	 */
	static async _onChatCardAction(event) {
		event.preventDefault();
		event.stopPropagation();

		// Extract card data
		const button = event.currentTarget;
		// button.disabled = true;
		const card = button.closest('.chat-card');
		const messageId = card.closest('.message').dataset.messageId;
		const message = game.messages.get(messageId);
		const action = button.dataset.action;

		// Recover the actor for the chat card
		const actor = await this._getChatCardActor(card);
		if (!actor) return;

		// Validate permission to proceed with the roll
		const isTargetted = action === 'save';
		if (!(isTargetted || game.user.isGM || actor.isOwner)) return;

		// Get the Item from stored flag data or by the item ID on the Actor
		const storedData = message.getFlag('shinobinosho', 'itemData');
		const item = storedData ? new this(storedData, { parent: actor }) : actor.items.get(card.dataset.itemId);

		switch (action) {
			case 'areaTemplate': {
				const app = new areaTemplateWindow(item);
				app.render(true);
			}
		}
	}

	/**
	 * Get the Actor which is the author of a chat card
	 * @param {HTMLElement} card    The chat card being used
	 * @returns {Actor|null}        The Actor document or null
	 * @private
	 */
	static async _getChatCardActor(card) {
		// Case 1 - a synthetic actor from a Token
		if (card.dataset.tokenId) {
			const token = await fromUuid(card.dataset.tokenId);
			if (!token) return null;
			return token.actor;
		}

		// Case 2 - use Actor ID directory
		const actorId = card.dataset.actorId;
		return game.actors.get(actorId) || null;
	}

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    // const label = `[${item.type}] ${item.name}`;
		const token = this.actor.token;

		let hasAreaTemplate;
		hasAreaTemplate = (this.type == "tecnicas" || this.type == "gerais" || this.type == "armas");
		hasAreaTemplate = (this.system?.areaTemplate && this.system?.areaTemplate.length !== 0) ? true : false;
	
		const templateData = {
			actor: this.actor,
			tokenId: token?.uuid || null,
			item: this,
			data: await this.getChatData(),
			labels: this.labels,
			hasAreaTemplate: hasAreaTemplate,
			system: [],
			info: [],
		};

		if (item.type == 'armas') {
			if (this.system?.detalhes?.caract?.improvisada) templateData.info.push("Improvisada");
			if (this.system?.detalhes?.caract?.armaDupla) templateData.info.push("Arma Dupla");
			if (this.system?.detalhes?.caract?.arremessavel) templateData.info.push("Arremessável");
			if (this.system?.detalhes?.caract?.duasMaos) templateData.info.push("Duas Mãos");
			if (this.system?.detalhes?.caract?.energizavel) templateData.info.push("Energizável");
			if (this.system?.detalhes?.caract?.ambidestra) templateData.info.push("Ambidestra");
			if (this.system?.detalhes?.caract?.acuidade) templateData.info.push("Acuidade");
		}
		
		if (item.type == 'tecnicas') {
			if (this.system?.detalhes?.caract?.selos) templateData.info.push("Selos de Mão");
			if (this.system?.detalhes?.caract?.escalonaChakra) templateData.info.push("Escalona com Chakra");
		}

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        // flavor: label,
        content: await renderTemplate('systems/shinobinosho/templates/chat/item-card.hbs', templateData),
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // const result = await roll.evaluate();
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }
}
