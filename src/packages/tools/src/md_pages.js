import { dropInExcerpt } from './mdsvex_excerpts.js';
import { mdsvex, escapeSvelte } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import examples from './examples.js';
import { getHighlighter } from './highlighter.js';

/**
 * @typedef Options
 * @type {object}
 * @property {string} syntax_theme - The Shiki theme.
 */

let langs = ['javascript', 'typescript', 'css', 'html', 'svelte', 'jsx'];

/**
 * @param {{theme: import('shiki').ThemeInput}} options
 */
function mdsvexOptions(options) {
	const { theme } = options;
	/** @type {boolean} */
	let themeLoaded = false;
	return {
		extensions: ['.md', '.svx'],
		remarkPlugins: [dropInExcerpt, examples, [remarkToc, { tight: true }]],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
		highlight: {
			highlighter: async (/** @type {string} */ code, /** @type {string} */ lang = 'text') => {
				const highlighter = await getHighlighter({ langs });

				if (!themeLoaded) {
					await highlighter.loadTheme(theme);
					themeLoaded = true;
				}
				const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'syntax' }));
				return `{@html \`${html}\` }`;
			},
		},
	};
}

/**
 * @param {{theme: import('shiki').ThemeInput}} options
 * @returns
 */
export function md_pages(options) {
	// @ts-ignore - mdsvex plugin types
	return mdsvex(mdsvexOptions(options));
}
