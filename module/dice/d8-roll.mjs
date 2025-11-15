
export default class D8Roll extends Roll {
  constructor(formula, data, options) {
    super(formula, data, options);
    if ( !this.options.configured ) this.configureModifiers();
  }

  /* -------------------------------------------- */

  /**
   * Create a D8Roll from a standard Roll instance.
   * @param {Roll} roll
   * @returns {D8Roll}
   */
  static fromRoll(roll) {
    const newRoll = new this(roll.formula, roll.data, roll.options);
    Object.assign(newRoll, roll);
    return newRoll;
  }

  /* -------------------------------------------- */

  /**
   * The HTML template path used to configure evaluation of this Roll
   * @type {string}
   */
  static EVALUATION_TEMPLATE = "systems/shinobinosho/templates/chat/roll-dialog.hbs";

  /* -------------------------------------------- */

  /**
   * The HTML template path used to display a Roll
   * @type {string}
   */
  static CHAT_TEMPLATE = "systems/shinobinosho/templates/dice/d8roll.hbs";

  /* -------------------------------------------- */

  /**
   * Does this roll start with a D8?
   * @type {boolean}
   */
  get validD8Roll() {
    return (this.terms[0] instanceof Die) && (this.terms[0].faces === 8);
  }

  /* -------------------------------------------- */

  /**
   * Is this roll a critical success? Returns undefined if roll isn't evaluated.
   * @type {boolean|void}
   */
  get isCritical() {
    if ( !this.validD8Roll || !this._evaluated || !this.hasCritical) return undefined;
    if ( !Number.isNumeric(this.options.critical) ) return false;
    return this.dice[0].total >= this.options.critical;
  }

	/**
   * Is this roll a critical failure? Returns undefined if roll isn't evaluated.
   * @type {boolean|void}
   */
  get isFailure() {
    if ( !this.validD8Roll || !this._evaluated || !this.hasCritical) return undefined;
    if ( !Number.isNumeric(this.options.failure) ) return false;
    return this.dice[0].total <= this.options.failure;
  }

  /* -------------------------------------------- */

	/**
   * Does this roll require a degree calculation? Returns the degree based on the roll result.
   * @type {string}
   */
	// NOVO: Lógica de Grau (Grau 4: Crítico, Grau 3: 12+, Grau 2: 8+, Grau 1: 4+, Falha Crítica: 2-3)
  get getDegree() {
    // Pega o resultado da soma dos dados (2d8)
    const d8_total = this.dice[0].total;

    if (!this.options.hasDegree) return null; // Retorna nulo se a flag não estiver ativa

    // Falha Crítica (2 ou 3 no 2d8)
    if (d8_total <= this.options.failure) { 
        return "Falha Crítica";
    }
    // Sucesso Crítico / Grau 4 (15 ou 16)
    else if (d8_total >= this.options.critical) {
        return "Grau 4";
    }
    // Grau 3 (12 a 14)
    else if (d8_total >= 12) {
        return "Grau 3";
    }
    // Grau 2 (8 a 11)
    else if (d8_total >= 8) {
        return "Grau 2";
    }
    // Grau 1 (4 a 7)
    else if (d8_total >= 4) {
        return "Grau 1";
    }
    // Deve ser inalcançável, mas garante um valor de falha
    else {
        return "Falha";
    }
  }

	get hasCritical() {
		return this.options.hasCritical;
	}

	get hasDegree() {
		return this.options.hasDegree;
	}

  /* -------------------------------------------- */
  /*  D8 Roll Methods                            */
  /* -------------------------------------------- */

	/** Work around upstream issue in which display base formula is used for chat messages instead of display formula */
	async render({template = this.options.chatTemplate ?? this.constructor.CHAT_TEMPLATE, isPrivate}){
		if (!this._evaluated) await this.evaluate({ allowInteractive: !isPrivate });
		const total = this.total ?? NaN;
		const tooltip = await this.getTooltip();

		const chatData = {
			user: game.user,
			flavor: isPrivate ? null : this.options.flavor,
			formula: isPrivate ? "???" : this._formula,
			tooltip,
			total: isPrivate ? "?" : total,
			critical: this.options.critical,
			degree: isPrivate ? "?" : this.getDegree,
			isCritical: this.isCritical,
			isFailure: this.isFailure,
			hasCritical: this.hasCritical,
			hasDegree: this.hasDegree,
		};

		return renderTemplate(template, chatData);
}

  /**
   * Apply optional modifiers which customize the behavior of the D8term
   * @private
   */
  configureModifiers() {
    if ( !this.validD8Roll ) return;

    const d8 = this.terms[0];
    d8.modifiers = [];
    // d8.number = 2;

    // Assign critical and failure thresholds
    if ( this.options.critical ) d8.options.critical = this.options.critical;
    if ( this.options.failure ) d8.options.failure = this.options.failure;

    // Re-compile the underlying formula
    this._formula = this.constructor.getFormula(this.terms);

    // Mark configuration as complete
    this.options.configured = true;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async toMessage(messageData={}, options={}) {
    // Record the preferred rollMode
    options.rollMode ??= this.options.rollMode;
    if ( options.rollMode === "roll" ) options.rollMode = undefined;
    options.rollMode ||= game.settings.get("core", "rollMode");

    // Evaluate the roll now so we have the results available
    if ( !this._evaluated ) await this.evaluate({ allowInteractive: options.rollMode !== CONST.DICE_ROLL_MODES.BLIND });

    // Add appropriate advantage mode message flavor
    // messageData.flavor = messageData.flavor || this.options.flavor;
    return super.toMessage(messageData, options);
  }

  /* -------------------------------------------- */
  /*  Configuration Dialog                        */
  /* -------------------------------------------- */

  /**
   * Create a Dialog prompt used to configure evaluation of an existing D8Roll instance.
   * @param {object} data                     Dialog configuration data
   * @param {string} [data.title]             The title of the shown dialog window
   * @param {number} [data.defaultRollMode]   The roll mode that the roll mode select element should default to
   * @param {number} [data.defaultAction]     The button marked as default
   * @param {string} [data.template]          A custom path to an HTML template to use instead of the default
   * @param {object} options                  Additional Dialog customization options
   * @returns {Promise<D8Roll|null>}         A resulting D8Roll object constructed with the dialog, or null if the
   *                                          dialog was closed
   */
  async configureDialog({title, defaultRollMode,
    defaultAbility, template}={}, options={}) {

    // Render the Dialog inner HTML
    const content = await renderTemplate(template ?? this.constructor.EVALUATION_TEMPLATE, {
      formula: this.formula,
      defaultRollMode,
      rollModes: CONFIG.Dice.rollModes,
			hasCritical: this.hasCritical,
			hasDegree: this.hasDegree,
			actor: options?.actor,
			dropdown: options?.dropdown
    });

    let defaultButton = "normal";

    // Create the Dialog window and await submission of the form
    return new Promise(resolve => {
      new Dialog({
        title,
        content,
        buttons: {
          normal: {
            label: "<i class='fas fa-dice'></i>Rolar",
            callback: html => resolve(this._onDialogSubmit(html))
          }
        },
        default: defaultButton,
        close: () => resolve(null)
      }, options).render(true);
    });
  }

  /* -------------------------------------------- */

  /**
   * Handle submission of the Roll evaluation configuration Dialog
   * @param {jQuery} html            The submitted dialog content
   * @param {number} advantageMode   The chosen advantage mode
   * @returns {D8Roll}              This damage roll.
   * @private
   */
  _onDialogSubmit(html) {
    const form = html[0].querySelector("form");

		if (form.bonus.value) {
			const bonus = new Roll(form.bonus.value, this.data);
			if ( !(bonus.terms[0] instanceof OperatorTerm) ) {
				this.terms.push(new OperatorTerm({operator: "+"}));
			}
			this.terms = this.terms.concat(bonus.terms);
		}

		if (form.dropdown?.value) {
			const dropdown = new Roll(form.dropdown.value, this.data);
			if ( !(dropdown.terms[0] instanceof OperatorTerm) ) {
				this.terms.push(new OperatorTerm({operator: "+"}));
			}
			this.terms = this.terms.concat(dropdown.terms);
			this.options.selectedIndex = form.dropdown.selectedIndex;
		}

		if (form.critical?.value) this.options.critical = form.critical.value;

    this.options.rollMode = form.rollMode.value;
    this.configureModifiers();
    return this;
  }
}