import { createHighlighter } from 'shiki';
/**
 *
 * @param {string} code
 * @param {import('shiki/types.mjs').ThemeRegistrationAny | import('shiki/types.mjs').StringLiteralUnion<import('shiki/types.mjs').BundledTheme, string>} theme
 * @returns
 */
async function transform(code, theme) {
	const highlighter = await createHighlighter({
		themes: [typeof theme === 'string' ? theme : 'night-owl'],
		langs: ['html'],
	});
	return highlighter.codeToHtml(code, {
		lang: 'html',
		theme: typeof theme === 'string' ? theme : 'night-owl',
	});
}

const default_theme = 'night-owl';

/** @returns {import('svelte/types/compiler/preprocess').PreprocessorGroup} */
export function iframe_demo(options = { theme: default_theme }) {
	return {
		name: 'iframe_demos',
		async markup({ content, filename }) {
			if (filename?.endsWith('.iframe.demo')) {
				const highlighted = await transform(content, options.theme);
				return {
					code: `${highlighted}<iframe srcdoc="${content}" />`,
				};
			}
		},
	};
}
