import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class ShinobiItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['shinobiNoSho', 'sheet', 'item'],
      width: 520,
			height: 445,
			template: 'systems/shinobinosho/templates/item/item-sheet.hbs',
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
			scrollY: [".content"],
    });
  }

  /** @override */
  get template() {
		const type = this.item.type.toLowerCase();
    const path = 'systems/shinobinosho/templates/item';
    return `${path}/item-${type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.data;

		// Dropdown
		context.itemsDropdown = CONFIG.shinobiNoSho.ITEMS.dropdown;
		context.combatAbilities = CONFIG.shinobiNoSho.combatAbilities;
		context.areas = CONFIG.shinobiNoSho.templateAreas;
		context.regraArea = CONFIG.shinobiNoSho.regraDeArea;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = this.item.getRollData();

    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

		/** @inheritDoc */
		_getSubmitData(updateData = {}) {
			const formData = foundry.utils.expandObject(
				super._getSubmitData(updateData),
			);
			const system = formData.system;
	
			// Handle Family array
			const arma = formData.system?.combate?.dano;
			if (arma) {
				arma.parts = Object.values(arma?.parts || {}).map((d) => [
					d[0] || '', d[1] || '']);
			}

			// Handle Family array
			if (system.efeitosAdquiridos) {
				system.efeitosAdquiridos = Object.values(system.efeitosAdquiridos || {}).map((d) => [
					d[0] || '', d[1] || '']);
			}

			// Handle Area array
			if (system.areaTemplate) {
				system.areaTemplate = Object.values(system.areaTemplate || {}).map((d) => [
					d[0] || '', d[1] || '', d[2] || '', d[3] || '', d[4] || '', d[5] || '']);
			}
	
			// Return the flattened submission data
			return foundry.utils.flattenObject(formData);
		}
	

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Damage
		html.find('.damage-control').click(this._onDamageControl.bind(this));

		// Effects Power
		html.find('.effectsPower-control').click(this._onEffectsPowerControl.bind(this));

		// Area Template Control
		html.find('.areaTemplate-control').click(this._onAreaTemplateControl.bind(this));

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }

	async _onDamageControl(event){
		event.preventDefault();
		const a = event.currentTarget;

		if (a.classList.contains('add-damage')) {
			await this._onSubmit(event);
			const damage = this.item.system.combate.dano;
			return this.item.update({
				'system.combate.dano.parts': damage.parts.concat([['','']]),
			});
		}

		if (a.classList.contains('delete-damage')) {
			await this._onSubmit(event);
			const html = a.closest('.damage-part');
			const damage = foundry.utils.deepClone(this.item.system.combate.dano);
			damage.parts.splice(Number(html.dataset.damagePart), 1);
			return this.item.update({'system.combate.dano.parts': damage.parts});
		}
	}

	async _onEffectsPowerControl(event){
		event.preventDefault();
		event.stopPropagation();
		const a = event.currentTarget;

		if (a.classList.contains('add-effectsPower')) {
			await this._onSubmit(event);
			const effects = this.item.system.efeitosAdquiridos;
			return this.item.update({
				'system.efeitosAdquiridos': effects.concat([['','']]),
			});
		}

		if (a.classList.contains('delete-effectsPower')) {
			await this._onSubmit(event);
			const html = a.closest('.effectsPower-part');
			const effects = foundry.utils.deepClone(this.item.system.efeitosAdquiridos);
			effects.splice(Number(html.dataset.effectsPart), 1);
			return this.item.update({'system.efeitosAdquiridos': effects});
		}
	}

	async _onAreaTemplateControl(event){
		event.preventDefault();
		event.stopPropagation();
		const a = event.currentTarget;

		if (a.classList.contains('add-areaTemplate')) {
			await this._onSubmit(event);
			const areas = this.item.system.areaTemplate;
			return this.item.update({
				'system.areaTemplate': areas.concat([['','','','','','']]),
			});
		}

		if (a.classList.contains('delete-areaTemplate')) {
			await this._onSubmit(event);
			const html = a.closest('.areaTemplate-part');
			const areas = foundry.utils.deepClone(this.item.system.areaTemplate);
			areas.splice(Number(html.dataset.areaPart), 1);
			return this.item.update({'system.areaTemplate': areas});
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
