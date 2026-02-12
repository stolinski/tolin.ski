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
 * @param {{theme: string}} options
 */
function mdsvexOptions(options) {
	const { theme } = options;
	return {
		extensions: ['.md', '.svx'],
		remarkPlugins: [dropInExcerpt, examples, [remarkToc, { tight: true }]],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
		highlight: {
			highlighter: async (/** @type {string} */ code, /** @type {string} */ lang = 'text') => {
				const highlighter = await getHighlighter({ themes: [theme], langs });

				await highlighter.loadLanguage('javascript', 'typescript', 'css', 'html', 'svelte', 'jsx');
				const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'syntax' }));
				return `{@html \`${html}\` }`;
			},
		},
	};
}

/**
 * @param {{theme: string}} options
 * @returns
 */
export function md_pages(options) {
	// @ts-ignore - mdsvex plugin types
	return mdsvex(mdsvexOptions(options));
}
