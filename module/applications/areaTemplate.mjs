// Reference: https://github.com/foundryvtt/dnd5e/blob/4.1.x/module/applications/actor/base-sheet.mjs#L781
// Reference: https://github.com/foundryvtt/dnd5e/blob/4.1.x/module/documents/activity/mixin.mjs#L1212
// Reference: https://github.com/foundryvtt/dnd5e/blob/b6d3b4e46cdb70f09f5731bad04a363f3b5a7d0a/module/canvas/ability-template.mjs#L4
// Reference: https://gitlab.com/vizael/Tormenta20/-/blob/master/module/chat.mjs#L155

import AbilityTemplate from "../canvas/measuredTemplate.mjs";

/**
 * A DocumentSheet for configure and apply templates of area.
 * This application are used on techniques and equipments items.
 */
export default class areaTemplateWindow extends DocumentSheet {
	/** @inheritDoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["shinobiNoSho", "areaTemplateWindow"],
			template: "systems/shinobinosho/templates/apps/areaTemplate.hbs",
			title: "Manipulador de Áreas e Medições",
			width: 350,
			height: "auto",
			closeOnSubmit: false,
		});
	}

	/** @inheritDoc */
	get title() {
		return `Áreas: ${this.object.name}`;
	}

	/** @inheritDoc */
	get id() {
		return `item-${this.object.id}`;
	}

	async getData() {
		return {
			system: this.document.system,
			areas: CONFIG.shinobiNoSho.templateAreas,
			id: this.id
		};
	}

	/** @inheritDoc */
	_getSubmitData(...args) {
		const data = foundry.utils.expandObject(super._getSubmitData(...args));
		// Return the flattened submission data
		return foundry.utils.flattenObject(data);
	}

	/** @inheritDoc */
	activateListeners(html) {
		super.activateListeners(html);

		$(".area").on("click", (ev) => {
			$(ev.target).find("input[type='radio'").prop("checked", true);
		});
		
		$(`.plusOne.${this.id}`).on("click", (ev) => {
			var numero = parseInt($(`.numberModifier.${this.id}`).val());
			numero++;
			$(`.numberModifier.${this.id}`).val(numero);
		});

		$(`.minusOne.${this.id}`).on("click", (ev) => {
			var numero = parseInt($(`.numberModifier.${this.id}`).val());
			numero--;
			$(`.numberModifier.${this.id}`).val(numero);
		});

		html.on('click', '.placeAreaTemplate', this.placeTemplate.bind(this));
	}

	async placeTemplate(event) {
		if (!canvas.ready) console.log("No canvas");

		const submitData = this._getSubmitData();
		if (submitData.area == undefined) {
			return ui.notifications.error("Selecione uma área predefinida que contenha um tipo de área e uma distância válida.");;
		}
		const areaAndDistance = submitData.area.split('/');

		const templateConversion = {
			onda: "rect",
			linha: "ray",
			esfera: "circle",
			cilindro: "circle",
			circulo: "circle",
			cone: "cone",
			meiaEsfera: "cone",
	};

		const templateData = {
			t: templateConversion[areaAndDistance[0]],
			shinobiType: areaAndDistance[0],
			distance: Number(areaAndDistance[1]),
			width: 10,
			angle: 45,
			direction: 0,
			fillColor: game.user.color,
			user: game.user.id,
			x: 0,
			y: 0
		};
		
		// Apply modifiers
		if (submitData.numberModifier) templateData.distance += submitData.numberModifier;
		if (submitData.areaModifier) templateData.t = templateConversion[submitData.areaModifier];

		switch (templateData.t) {
			case "ray":
				templateData.width = CONFIG.MeasuredTemplate.defaults.width * (canvas.dimensions?.distance ?? 1);
				break;
			case "cone":
				templateData.angle = CONFIG.MeasuredTemplate.defaults.angle;
				if (submitData.areaModifier === "cone") templateData.angle = CONFIG.MeasuredTemplate.defaults.angle;
				else if (templateData.shinobiType === "meiaEsfera" || submitData.areaModifier === "meiaEsfera") templateData.angle = 180;
				break;
			case "rect": {
				const distance = templateData.distance ?? 0;
				templateData.distance = Math.hypot(distance, distance);
				templateData.width = distance;
				templateData.direction = 45;
				break;
			}
		}

		const template = AbilityTemplate.fromItem(this, templateData);
		if ( template ) {
			template.drawPreview();
		}
}

	/** @inheritdoc */
	async _onSubmit(...args) {
		await super._onSubmit(...args);
	}
}