import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { d8Roll } from '../dice/dice.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShinobiNPCSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['shinobiNoSho', 'sheet', 'actor', 'npc'],
      width: 485,
      height: 690,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'pericias',
        }
      ],
    });
  }

  /** @override */
  get template() {
		const type = this.actor.type.toLowerCase();
    return `systems/shinobinosho/templates/npc/actor-${type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = context.data;

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

		// Dropdown
		context.tamanhos = CONFIG.shinobiNoSho.tamanhos;

    // Prepare character data and items.
    if (actorData.type == 'NPC') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Add roll data for TinyMCE editors.
    context.rollData = context.actor.getRollData();

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterData(context) {
    // Handle ability scores.
    for (let [k, v] of Object.entries(context.system.abilities)) {
      v.label = game.i18n.localize(CONFIG.shinobiNoSho.abilities[k]) ?? k;
    }

		for (let [k, v] of Object.entries(context.system.skills.geral)) {
      v.label = game.i18n.localize(CONFIG.shinobiNoSho.skillsAbbr.geral[k]) ?? k;
			if (v.caract.treinada) v.label += "+";
			if (v.caract.armadura) v.label += "*";
			if (k == "voo") v.caract.isVoo = true;
    }

		for (let [k, v] of Object.entries(context.system.skills.social)) {
      v.label = game.i18n.localize(CONFIG.shinobiNoSho.skillsAbbr.social[k]) ?? k;
			if (v.caract.treinada) v.label += "+";
			if (v.caract.armadura) v.label += "*";
    }
  }

  /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Initialize containers.
    const armas = [];
    const armaduras = [];
    const gerais = [];
		const aptidoes = [];
		const poderes = [];
		const tecnicas = [];
		const dispositivos = [];

    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      if (i.type === 'armas') { armas.push(i); }
      else if (i.type === 'armaduras') { armaduras.push(i); }
			else if (i.type === 'gerais') { 
				if (i.system.tipo.includes("dispositivo")) dispositivos.push(i);
				else gerais.push(i);
			} else if (i.type === 'aptidoes') { aptidoes.push(i); }
			else if (i.type === 'poderes') { poderes.push(i); }
			else if (i.type === 'tecnicas') { tecnicas.push(i); }
    }

    // Assign and return
    context.armas = armas;
    context.armaduras = armaduras;
    context.gerais = gerais;
		context.aptidoes = aptidoes;
    context.poderes = poderes;
    context.tecnicas = tecnicas;
		context.dispositivos = dispositivos;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }

		for (const input of this.form.querySelectorAll("input[type='number']")) {
			input.addEventListener("change", this._onChangeInputShinobi.bind(this));
		}

		for (const button of this.form.querySelectorAll(".adjustment-button")) {
			button.addEventListener("click", this._onAdjustInput.bind(this));
		}

  }

	async _onAdjustInput(event) {
		const button = event.currentTarget;
		const { action } = button.dataset;
		const input = button.parentElement.querySelector("input");
		const min = input.min ? Number(input.min) : -Infinity;
		const max = input.max ? Number(input.max) : Infinity;
		let value = Number(input.value);
		if (isNaN(value)) return;
		value += action === "increase" ? 1 : -1;
		input.value = Math.clamp(value, min, max);
		input.dispatchEvent(new Event("change"));
	}

	async _onChangeInputShinobi(event) {
    const itemId = event.target.closest("[data-item-id]")?.dataset.itemId;
    if ( !itemId ) return;

    event.stopImmediatePropagation();
    const item = this.document.items.get(itemId);
    const min = event.target.min !== "" ? Number(event.target.min) : -Infinity;
    const max = event.target.max !== "" ? Number(event.target.max) : Infinity;
    const value = Math.clamp(event.target.valueAsNumber, min, max);

    if ( !item || Number.isNaN(value) ) return;

    event.target.value = value;
    item.update({[event.target.dataset.name]: value});
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `Novo(a) ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onRoll(event) {
    event.preventDefault();
		event.stopPropagation();
    const element = event.currentTarget;
    const dataset = element.dataset;
		const context = super.getData();
    // Use a safe clone of the actor data for further operations.
    const actorData = context.data;
    // Add the actor's data to context.data for easier access, as well as flags.
    const system = actorData.system;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }

			if (dataset.rollType == 'ability' && dataset.key) {
				const data = system.abilities[dataset.key];
				const getLabel = game.i18n.localize(`shinobiNoSho.ability.${dataset.key}.long`);
				const label =  'Fazendo um teste de ' + getLabel + ':';
        const roll = await d8Roll({
					data,
					title: `Configuração de ${getLabel}`,
					flavor: label,
					messageData: {speaker: ChatMessage.getSpeaker({ actor: this.actor })},
					event,
					parts: [data.tbonus],
					shiftFastForward: event.shiftKey,
					hasDegree: false,
					hasCritical: false,
				});
				return roll;
      }

			if (dataset.rollType == 'skill' && dataset.key) {
				const data = system.skills.geral[dataset.key] || system.skills.social[dataset.key];
				let getLabel = '';
				if (game.i18n.has(`shinobiNoSho.skills.geral.${dataset.key}`)) {
					getLabel = game.i18n.localize(`shinobiNoSho.skills.geral.${dataset.key}`);
				} else if (game.i18n.has(`shinobiNoSho.skills.social.${dataset.key}`)) {
					getLabel = game.i18n.localize(`shinobiNoSho.skills.social.${dataset.key}`);
				}
				
				if (data.nome) getLabel = system.skills.geral.pericia_1.nome;

				const label =  'Fazendo um teste de ' + getLabel + ':';
        const roll = await d8Roll({
					data,
					title: `Configuração de ${getLabel}`,
					flavor: label,
					messageData: {speaker: ChatMessage.getSpeaker({ actor: this.actor })},
					event,
					parts: [data.tbonus],
					shiftFastForward: event.shiftKey,
					hasDegree: false,
					hasCritical: false,
				});
				return roll;
      }

			if (dataset.rollType == 'combatAbilities' && dataset.key) {
				const data = system.abilities.combate[dataset.key];
				let getLabel = game.i18n.localize(`shinobiNoSho.combatAbilities.${dataset.key}`);
				const label =  'Fazendo um teste de ' + getLabel + ':';
				const roll = await d8Roll({
					data,
					title: `Configuração de ${getLabel}`,
					flavor: label,
					messageData: {speaker: ChatMessage.getSpeaker({ actor: this.actor })},
					event,
					parts: [data.tbonus],
					shiftFastForward: event.shiftKey,
					hasDegree: (dataset.key == "CC" || dataset.key == "CD"),
					hasCritical: (dataset.key == "CC" || dataset.key == "CD"),
				});
				return roll;
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

	/* -------------------------------------------- */

	/* -------------------------------------------- */
	/*  Form Submission                             */
	/* -------------------------------------------- */

	/** @inheritdoc */
	async _onSubmit(...args) {
		await super._onSubmit(...args);
	}

	/* -------------------------------------------- */
}
