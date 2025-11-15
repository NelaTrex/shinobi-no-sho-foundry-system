/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/shinobinosho/templates/actor/parts/actor-aptidoesPoderes.hbs',
    'systems/shinobinosho/templates/actor/parts/actor-combate.hbs',
    'systems/shinobinosho/templates/actor/parts/actor-inventario.hbs',
    'systems/shinobinosho/templates/actor/parts/actor-efeitos.hbs',
		'systems/shinobinosho/templates/actor/parts/actor-pericias.hbs',
		'systems/shinobinosho/templates/actor/parts/actor-tecnicas.hbs',
    // Item partials
    'systems/shinobinosho/templates/item/parts/item-efeitos.hbs',
		// NPC partials
		'systems/shinobinosho/templates/npc/parts/actor-efeitos.hbs',
		'systems/shinobinosho/templates/npc/parts/actor-aptidoesPoderes.hbs',
    'systems/shinobinosho/templates/npc/parts/actor-inventario.hbs',
		'systems/shinobinosho/templates/npc/parts/actor-pericias.hbs',
		'systems/shinobinosho/templates/npc/parts/actor-tecnicas.hbs',		
  ]);
};
