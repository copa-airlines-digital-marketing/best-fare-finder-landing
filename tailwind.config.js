// Used for testing styles

/** @type {import('tailwindcss').Config} */
const cmpreset = require('cmds-tailwind-styles');

module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/cmds-component-*/*.{html,js,svelte,ts}'
	],
	presets: [cmpreset]
};
