// vite.config.js
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		nodePolyfills({
			// To exclude specific polyfills, add them to this list.
			// exclude: [
			// 	'fs', // Excludes the polyfill for `fs` and `node:fs`.
			// ],
			// Whether to polyfill specific globals.
			globals: {
				// path: true,
				// Buffer: true, // can also be 'build', 'dev', or false
				// global: true,
				// process: true,
			},
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
		sveltekit(),
	],
	server: {
		fs: {
			strict: false,
		},
	},
};

export default config;
