import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { md_pages, html_demo, iframe_demo } from '@drop-in/tools';
import syntax_theme from './src/syntax.json' with { type: 'json' };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		md_pages(),
		iframe_demo({
			theme: syntax_theme,
		}),
		html_demo({
			theme: syntax_theme,
		}),
	],
	extensions: ['.svelte', '.svx', '.md', '.html', '.demo', '.iframe.demo'],
	kit: {
		adapter: adapter(),
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
