import { dropInExcerpt } from './mdsvex_excerpts.js';
import { mdsvex, escapeSvelte } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import examples from './examples.js';
import { createHighlighter } from 'shiki';

/**
 * @typedef Options
 * @type {object}
 * @property {string} syntax_theme - The Shiki theme.
 */

let langs = ['javascript', 'typescript', 'css', 'html', 'svelte', 'jsx'];

function mdsvexOptions(options) {
	const { theme } = options;
	return {
		extensions: ['.md', '.svx'],
		remarkPlugins: [dropInExcerpt, examples, [(remarkToc, { tight: true })]],
		rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
		highlight: {
			highlighter: async (code, lang = 'text') => {
				const highlighter = await createHighlighter({
					themes: [theme],
					langs,
				});

				await highlighter.loadLanguage('javascript', 'typescript', 'css', 'html', 'svelte', 'jsx');
				const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'syntax' }));
				return `{@html \`${html}\` }`;
			},
		},
	};
}

/**
 *
 * @param {Options} [options]
 * @returns
 */
export function md_pages(options) {
	const mdsvex_options = mdsvexOptions(options);
	return mdsvex(mdsvex_options);
}
