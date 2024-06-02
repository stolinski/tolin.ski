// vite.config.js
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		nodePolyfills({
			// To add only specific polyfills, add them here. If no option is passed, adds all polyfills
			include: ['path'],
		}),
		sveltekit(),
	],
};

export default config;
