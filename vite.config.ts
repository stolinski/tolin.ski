// vite.config.js
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [nodePolyfills(), sveltekit()],
	server: {
		fs: {
			strict: false,
		},
	},
};

export default config;
