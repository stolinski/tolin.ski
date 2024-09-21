import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { md_pages, html_demo, iframe_demo, html_d } from '@drop-in/tools';
import syntax_theme from './src/syntax.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		md_pages({
			theme: syntax_theme,
		}),
		html_d(),
	],
	extensions: ['.svelte', '.svx', '.md', '.html', '.demo', '.iframe.demo'],
	kit: {
		adapter: adapter({ fallback: 'index.html' }),
		prerender: {
			handleHttpError: 'warn',
		},
		alias: {
			$: 'src',
			$settings: 'src/settings',
			$routes: 'src/routes',
			$state: 'src/state',
			$types: 'src/types',
			$utils: 'src/utilities',
		},
	},
};

export default config;
