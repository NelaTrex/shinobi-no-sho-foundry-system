
/**
 * Register all of the system's settings.
 */
export default function registerSystemSettings() {
	/*
	 * Create a custom config setting
	 */
	// game.settings.register('ordemparanormal', 'mySettingName', {
	// 	name: 'My Setting',
	// 	hint: 'A description of the registered setting and its behavior.',
	// 	scope: 'world',     // "world" = sync to db, "client" = local storage
	// 	config: true,       // false if you dont want it to show in module config
	// 	type: Number,       // Number, Boolean, String, Object
	// 	default: 0,
	// 	onChange: value => { // value is the new value of the setting
	// 		console.log(value);
	// 	},
	// });

	// Internal System Migration Version
	game.settings.register('shinobinosho', 'systemMigrationVersion', {
		name: 'System Migration Version',
		scope: 'world',
		config: false,
		type: String,
		default: ''
	});

	game.settings.register('shinobinosho', 'changeSizeOfTokensDynamically', {
		name: 'SETTINGS.changeSizeOfTokensDynamically',
		hint: 'SETTINGS.changeSizeOfTokensDynamicallyHint',
		scope: 'world',     // "world" = sync to db, "client" = local storage
		config: true,       // false if you dont want it to show in module config
		type: Boolean,       // Number, Boolean, String, Object
		default: true,
		requiresReload: true, // true if you want to prompt the user to reload
		onChange: value => { // value is the new value of the setting
			console.log(value);
		},
	});
}