// Import document classes.
import { ShinobiActor } from "./documents/actor.mjs";
import { ShinobiItem } from "./documents/item.mjs";
// Import sheet classes.
import { ShinobiActorSheet } from "./sheets/actor-sheet.mjs";
import { ShinobiItemSheet } from "./sheets/item-sheet.mjs";
import { ShinobiNPCSheet } from "./sheets/npc-sheet.mjs";
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { shinobiNoSho } from "./helpers/config.mjs";
import registerSystemSettings from "./settings.mjs";
import D8Roll from "./dice/d8-roll.mjs";
import * as chat from './helpers/chat-message.mjs';
import * as migrations from './migrations.mjs';

globalThis.shinobinosho = {
	chat
};

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.shinobiNoSho = {
    ShinobiActor,
    ShinobiItem,
		ShinobiActorSheet,
		ShinobiItemSheet,
		ShinobiNPCSheet,
    rollItemMacro,
		D8Roll
  };

  // Add custom constants for configuration.
  CONFIG.shinobiNoSho = shinobiNoSho;
	CONFIG.Dice.D8Roll = D8Roll;
	CONFIG.Dice.rolls = [D8Roll];

	// Template for Rolls
	// CONFIG.Dice.rolls[0].CHAT_TEMPLATE = 'systems/shinobinosho/templates/dice/roll.hbs';

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '@rollIniciativa',
    decimals: 2,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = ShinobiActor;
  CONFIG.Item.documentClass = ShinobiItem;

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
	Items.unregisterSheet('core', ItemSheet);
  Actors.registerSheet('shinobiNoSho', ShinobiActorSheet, { types: ['Ninja'], makeDefault: true });
	Actors.registerSheet('shinobiNoSho', ShinobiNPCSheet, { types: ['NPC'], makeDefault: true });
  Items.registerSheet('shinobiNoSho', ShinobiItemSheet, { makeDefault: true });

	// Register System Settings.
	registerSystemSettings();

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	// eslint-disable-next-line no-invalid-this
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifInequals', function (arg1, arg2, options) {
	// eslint-disable-next-line no-invalid-this
	return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
	const creature = {
		bar: ["attributes.vitalidade", "attributes.chakra", "attributes.absorcao"],
		value: ["attributes.dureza"]
	}

	CONFIG.Actor.trackableAttributes = {
    Ninja: {
      bar: [...creature.bar],
			value: [...creature.value]
    },
		NPC: {
			bar: [...creature.bar],
			value: [...creature.value]
		}
  };

	CONFIG.shinobiNoSho.trackableAttributes = expandAttributeList(CONFIG.shinobiNoSho.trackableAttributes);
});

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
  return attributes.reduce((obj, attr) => {
    foundry.utils.setProperty(obj, attr, true);
    return obj;
  }, {});
}

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));

	// Determine whether a system migration is required and feasible
	if ( !game.user.isGM ) return;
	const cv = game.settings.get('shinobinosho', 'systemMigrationVersion') || game.world.flags.shinobinosho?.version;
	const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
	if ( !cv && totalDocuments === 0 ) return game.settings.set('shinobinosho', 'systemMigrationVersion', game.system.version);
	// When the flag is greater than the current migration version, the migration is perfomed.
	console.log(`Verificando a necessidade de migração...`);
	console.log(cv, game.system.flags.needsMigrationVersion, !foundry.utils.isNewerVersion(game.system.flags.needsMigrationVersion, cv));
	if ( cv && !foundry.utils.isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) {
		console.log("Migração não é necessária.")
		return;
	};
	console.log("Iniciando a migração de dados!")

	// Determine whether a system migration is required and feasible
	migrations.migrateWorld();
});

Hooks.on('renderChatMessage', chat.onRenderChatMessage);
Hooks.on('renderChatLog', (app, html, data) => ShinobiItem.chatListeners(html));
Hooks.on('renderChatPopout', (app, html, data) => ShinobiItem.chatListeners(html));

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== 'Item') return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn(
      'You can only create macro buttons for owned Items'
    );
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.shinobiNoSho.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(
    (m) => m.name === item.name && m.command === command
  );
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: 'script',
      img: item.img,
      command: command,
      flags: { 'shinobiNoSho.itemMacro': true },
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then((item) => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(
        `Could not find item ${itemName}. You may need to delete and recreate this macro.`
      );
    }

    // Trigger the item roll
    item.roll();
  });
}

Hooks.on('renderSettings', async (app, [html]) => {
	const details = html.querySelector('#game-details');
	const pip = details.querySelector('.system-info .update');
	details.querySelector('.system').remove();

	const heading = document.createElement('div');
	heading.classList.add('shinobi', 'sidebar-heading');
	heading.innerHTML = `
    <h2>${game.i18n.localize('WORLD.GameSystem')}</h2>
    <ul class="links">
      <li>
        <a class="credits" href="javascript:void(0)" target="_blank">
				${game.i18n.localize('shinobiNoSho.creditos')}</a>
      </li>
      <li>
        <a href="https://discord.gg/8vmJ7Mt" target="_blank">
          ${game.i18n.localize('shinobiNoSho.social.discordLivro')}
        </a>
      </li>
			<li>
        <a href="https://narutod8.weebly.com/" target="_blank">
          ${game.i18n.localize('shinobiNoSho.social.site')}
        </a>
      </li>
    </ul>
  `;
	details.insertAdjacentElement('afterend', heading);

	const badge = document.createElement('div');
	badge.classList.add('shinobi', 'system-badge');
	badge.innerHTML = `
    <img src="systems/shinobinosho/assets/logoshinobinosho.webp" 
		data-tooltip="${game.i18n.localize('shinobiNoSho.nome')}" alt="${game.system.title}">
    <span class="system-info">${game.i18n.localize('shinobiNoSho.configuracoesVersao')} 
		<strong>${game.system.version}</strong> </span>
		<p><a href="https://discord.gg/7qE4pC2Mfy" target="_blank">
    <span class="system-info" data-tooltip="${game.i18n.localize('shinobiNoSho.social.discordForja')}">
		<i class="fa-brands fa-discord"></i> Forja dos Narradores</span></a>&nbsp;&nbsp;
		<a href="https://twitter.com/EuSouOWendel" target="_blank" 
		data-tooltip="${game.i18n.localize('shinobiNoSho.social.twitter')}">
		<span class="system-info"><i class="fa-brands fa-twitter"></i> eusouowendel</span></p>
  `;
	if (pip) badge.querySelector('.system-info').insertAdjacentElement('beforeend', pip);
	heading.insertAdjacentElement('afterend', badge);

	const credits = html.querySelector('.credits');
	credits.addEventListener('click', async function (ev) {
		const content = await renderTemplate('systems/shinobinosho/templates/dialog/credits.hbs');
		new Dialog({
			title: 'Créditos no Desenvolvimento do Sistema',
			content: content,
			buttons: {},
			render: (html) => console.log('Janela (dialog) de créditos foi renderizada corretamente.'),
			close: (html) => console.log('Janela (dialog) foi fechada com sucesso!'),
		}).render(true);
	});
});

Hooks.on('preCreateActor', function (actor, data) {
	let prototypeToken = { actorLink: (actor.type === 'Ninja') ? true : false };
	actor.updateSource({prototypeToken});
	console.log(actor);
	const teste = actor.updateSource({
		'prototypeToken.flags.barbrawl.resourceBars': {
			'vitalidade': {
				id: 'vitalidade',
				attribute: 'attributes.vitalidade',
				label: 'Vitalidade',
				style: 'fraction',
				mincolor: '#ff1a1a',
				maxcolor: '#80ff00',
				position: 'bottom-outer',
				ownerVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
        otherVisibility: CONST.TOKEN_DISPLAY_MODES.NONE,
			},
			'chakra': {
				id: 'chakra',
				attribute: 'attributes.chakra',
				label: 'Chakra',
				style: 'fraction',
				mincolor: '#242899',
				maxcolor: '#66a8ff',
				position: 'bottom-outer',
				ownerVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
        otherVisibility: CONST.TOKEN_DISPLAY_MODES.NONE,
			},
			'absorcao': {
				id: 'absorcao',
				attribute: 'attributes.absorcao',
				label: 'Absorção',
				style: 'fraction',
				mincolor: '#000000',
				maxcolor: '#000000',
				position: 'bottom-outer',
				ownerVisibility: CONST.TOKEN_DISPLAY_MODES.HOVER,
        otherVisibility: CONST.TOKEN_DISPLAY_MODES.NONE,
			},
		}
	}, {diff: false, recursive: false});
	console.log(actor);
	console.log(teste);
});