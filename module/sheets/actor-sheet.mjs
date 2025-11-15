import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { d8Roll } from '../dice/dice.mjs';

function roundHalfUp(value) {
    return Math.ceil(value / 2);
}
/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShinobiActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['shinobiNoSho', 'sheet', 'actor'],
      width: 600,
      height: 820,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'combate',
        },
				{
          navSelector: '.sub-tabs',
          contentSelector: '.sub-body',
          initial: 'historia',
        },
				{
          navSelector: '.pericias-sheet-tabs',
          contentSelector: '.pericias-sheet-body',
          initial: 'gerais',
        }
      ],
    });
  }

  /** @override */
  get template() {
		const type = this.actor.type.toLowerCase();
    return `systems/shinobinosho/templates/actor/actor-${type}-sheet.hbs`;
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
		context.periciasGerais = CONFIG.shinobiNoSho.skills.geral;
		context.periciasSociais = CONFIG.shinobiNoSho.skills.social;
		context.atributos = CONFIG.shinobiNoSho.abilities;
		context.atributosAbv = CONFIG.shinobiNoSho.abilityAbbreviations;
		context.habilidadesCombate = CONFIG.shinobiNoSho.combatAbilities;
		context.header = CONFIG.shinobiNoSho.header;
		context.socialCustom = CONFIG.shinobiNoSho.periciasSociaisCustom;
		context.vooCustom = CONFIG.shinobiNoSho.periciaVooCustom;
		context.tamanhos = CONFIG.shinobiNoSho.tamanhos;

    // Prepare character data and items.
    if (actorData.type == 'Ninja') {
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

    // --- [INÍCIO DA NOVA LÓGICA DE CÁLCULO] ---
    const data = context.system;
    const abilities = data.abilities;
    const attributes = data.attributes;
    const skills = data.skills;
    
    // 1. CÁLCULO DE ENERGIAS MÁXIMAS (Vitalidade e Chakra)
    // Vitalidade = 10 + 3*Vigor + 5*NC
    attributes.vitalidade.max = 10 + 
        (attributes.vitalidade.mult * abilities.vig.value) + 
        (attributes.vitalidade.multNivel * data.details.nivelCampanha);

    // Chakra = 10 + 3*Espírito
    attributes.chakra.max = 10 + 
        (attributes.chakra.mult * abilities.esp.value);

    // 2. CÁLCULO DE HABILIDADES DE COMBATE (CC, CD, ESQ, LM)
    // Note: Usaremos 'abilities.combate.CC.base' como a base customizada de 1 a 5.
    
    // a. Configuração do CC (Checagem para Aptidão Acuidade)
    // Esta parte assume que você terá uma forma de checar se a Aptidão 'Acuidade' está ativa.
    // Por enquanto, usaremos 'for', mas deixe o espaço para a checagem de Aptidão.
    let ccAbilityValue = abilities.for.value;

    // --- [INÍCIO VERIFICAÇÃO ACUIDADE] ---
    // Verifica se o ator possui a Aptidão 'Acuidade' entre seus itens.
    const acuidade = this.actor.items.some(i => 
        i.type === 'aptidoes' && i.name.toLowerCase().includes('acuidade')
    );

    if (acuidade) {
        ccAbilityValue = abilities.des.value;
    }
    // --- [FIM VERIFICAÇÃO ACUIDADE] ---
    
    // Cálculo CC
    abilities.combate.CC.value = abilities.combate.CC.base + 
        ccAbilityValue + 
        abilities.combate.CC.bonus; 

    // Cálculo CD
    abilities.combate.CD.value = abilities.combate.CD.base + 
        abilities.des.value + 
        abilities.combate.CD.bonus;

    // Cálculo ESQUIVA (E)
    // Usaremos AGI, que já é o 'ability' padrão (linha 55 do template.json).
    abilities.combate.E.value = abilities.combate.E.base + 
        abilities.agi.value + 
        abilities.combate.E.bonus;

    // Cálculo LM
    // Usaremos PER, que já é o 'ability' padrão (linha 62 do template.json).
    abilities.combate.LM.value = abilities.combate.LM.base + 
        abilities.per.value + 
        abilities.combate.LM.bonus;

    // Cálculo da Iniciativa (Agilidade + Prontidão)
    // Nota: O valor de Prontidão (skills.geral.prontidao.value) será calculado 
    // no próximo bloco, então garanta que este cálculo de Iniciativa venha DEPOIS 
    // (ou que a Prontidão já tenha sido calculada antes, o que faremos).
    
    // --- [FIM DA NOVA LÓGICA DE CÁLCULO] ---

		for (let [k, v] of Object.entries(context.system.skills.geral)) {
      // --- [INÍCIO CÁLCULO DE PERÍCIA GERAL] ---
      const attributeValue = abilities[v.ability].value;
      
      // 1. Calcula o Meio Atributo
      v.meio_atributo = roundHalfUp(attributeValue);
      
      // 2. Calcula o Total: 1/2 Atributo + Pontos Gastos + Bônus
      // Assume que 'v.pontos_gastos' existe (adicionado no template.json)
      v.value = v.meio_atributo + (v.pontos_gastos || 0) + (v.bonus || 0);

      // --- [FIM CÁLCULO DE PERÍCIA GERAL] ---
      v.label = game.i18n.localize(CONFIG.shinobiNoSho.skills.geral[k]) ?? k;
			if (v.caract.treinada) v.label += "+";
			if (v.caract.armadura) v.label += "*";
			if (k == "voo") v.caract.isVoo = true;
    }

		for (let [k, v] of Object.entries(context.system.skills.social)) {
      // --- [INÍCIO CÁLCULO DE PERÍCIA SOCIAL] ---
      // Para perícias sociais, o atributo base é o 'ability' principal.
      const attributeValue = abilities[v.ability].value;
      
      // 1. Calcula o Meio Atributo
      v.meio_atributo = roundHalfUp(attributeValue);
      
      // 2. Calcula o Total: 1/2 Atributo + Pontos Gastos + Bônus
      // Assume que 'v.pontos_gastos' existe (adicionado no template.json)
      v.value = v.meio_atributo + (v.pontos_gastos || 0) + (v.bonus || 0);

      // --- [FIM CÁLCULO DE PERÍCIA SOCIAL] ---
      v.label = game.i18n.localize(CONFIG.shinobiNoSho.skills.social[k]) ?? k;
			if (v.caract.treinada) v.label += "+";
			if (v.caract.armadura) v.label += "*";
    }

    // --- [CÁLCULO FINAL DA INICIATIVA] ---
    // Iniciativa = Agilidade + Prontidão.value
    attributes.init.value = abilities.agi.value + skills.geral.prontidao.value;
    
    // --- [FIM CÁLCULO FINAL DA INICIATIVA] ---
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

	/** @inheritDoc */
	_getSubmitData(updateData = {}) {
		const formData = foundry.utils.expandObject(
			super._getSubmitData(updateData),
		);

		// Handle Family array
		const biografia = formData.system?.details?.biografia;
		if (biografia) {
			biografia.familia = Object.values(biografia?.familia || {}).map((d) => [
				d[0] || '', d[1] || '', d[2] || '', d[3] || '', d[4] || '' ]);
		}

		// Return the flattened submission data
		return foundry.utils.flattenObject(formData);
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

		// Relations Handler
		html.find('.relations-control').click(this._onRelationsControl.bind(this));

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

	async _onRelationsControl(event){
		event.preventDefault();
		const a = event.currentTarget;

		if (a.classList.contains('add-relation')) {
			await this._onSubmit(event);
			const family = this.actor.system.details.biografia.familia;
			return this.actor.update({
				'system.details.biografia.familia': family.concat([['','','','','']]),
			});
		}

		if (a.classList.contains('delete-relation')) {
			await this._onSubmit(event);
			const html = a.closest('.relation-part');
			const family = foundry.utils.deepClone(this.actor.system.details.biografia.familia);
			family.splice(Number(html.dataset.relationPart), 1);
			return this.actor.update({'system.details.biografia.familia': family});
		}
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
					parts: [data.total],
					shiftFastForward: event.shiftKey,
					hasDegree: true, 
          hasCritical: true, 
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
					parts: [data.total],
					shiftFastForward: event.shiftKey,
					hasDegree: true, // Ativa o Grau de Acerto/Dano para todos
          hasCritical: true, // Ativa o Crítico (2-3 / 15-16) para todos
        });
				return roll;
      }
    }

    // Handle rolls that supply the formula directly.
    // --- [INÍCIO NOVO: ROLAGEM DE INICIATIVA] ---
      if (dataset.rollType == 'init' && dataset.key == 'init') {
        const data = system.attributes.init;
        const total = data.value; // Valor total calculado (AGI + Prontidão)
        const getLabel = game.i18n.localize('shinobiNoSho.attribute.init.long') || 'Iniciativa'; 
        const label =  'Rolando ' + getLabel + ':';
        
        const roll = await d8Roll({
          data,
          title: `Configuração de ${getLabel}`,
          flavor: label,
          messageData: {speaker: ChatMessage.getSpeaker({ actor: this.actor })},
          event,
          parts: [total], 
          shiftFastForward: event.shiftKey,
          hasDegree: false, // Iniciativa não tem Grau de Dano/Acerto no resultado final
          hasCritical: true, // Mas usa a lógica de Crítico/Falha do 2d8
        });
        return roll;
      }
      // --- [FIM NOVO: ROLAGEM DE INICIATIVA] ---
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
