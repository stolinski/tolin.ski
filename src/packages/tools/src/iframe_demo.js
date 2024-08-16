import { getHighlighter } from 'shiki';
/**
 *
 * @param {string} code
 * @param {import('shiki/types.mjs').ThemeRegistrationAny | import('shiki/types.mjs').StringLiteralUnion<import('shiki/types.mjs').BundledTheme, string>} theme
 * @returns
 */
async function transform(code, theme) {
	if (typeof theme === 'string') {
		const highlighter = await getHighlighter({
			themes: [theme],
			langs: ['html'],
		});
		await highlighter.loadLanguage('html');
		return highlighter.codeToHtml(code, { lang: 'html', theme });
	} else {
		const highlighter = await getHighlighter({
			themes: [],
			langs: ['html'],
		});
		highlighter.loadTheme(theme);
		await highlighter.loadLanguage('html');
		return highlighter.codeToHtml(code, { lang: 'html', theme: 'syntax' });
	}
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
