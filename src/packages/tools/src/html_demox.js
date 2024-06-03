import { getHighlighter } from 'shiki';
import { JSDOM } from 'jsdom';

/**
 *
 * @param {string} input
 * @returns
 */
function parseContent(input) {
	const insideScriptMatch = input.match(/<script>([\s\S]*?)<\/script>/);
	const outsideScriptContent = input.replace(/<script>[\s\S]*?<\/script>/, '').trim();

	let insideScriptContent = '';
	if (insideScriptMatch && insideScriptMatch[1]) {
		insideScriptContent = insideScriptMatch[1].trim();
	}

	return {
		insideScript: insideScriptContent,
		outsideScript: outsideScriptContent,
	};
}

/**
 *
 * @param {string} code
 * @param {import('shiki/types.mjs').ThemeRegistrationAny | import('shiki/types.mjs').StringLiteralUnion<import('shiki/types.mjs').BundledTheme, string>} theme
 * @returns
 */
async function transform(code, theme) {
	const highlighter = await getHighlighter({
		themes: [theme],
		langs: ['html'],
	});
	await highlighter.loadLanguage('html');
	return highlighter.codeToHtml(code, { lang: 'html', theme });
}

/** @returns {import('svelte/types/compiler/preprocess').PreprocessorGroup} */
export function html_demo(options = { theme: 'night-owl' }) {
	return {
		name: 'html_demos',
		async markup({ content, filename }) {
			if (filename?.endsWith('.html') && content.includes('<!-- DEMO -->')) {
				const { insideScript, outsideScript } = parseContent(content);
				// Removes comment at top of file
				const content_without_demo_comment = content.replace('<!-- DEMO -->\n', '');

				const highlighted = await transform(content_without_demo_comment, options.theme);
				return {
					code: `<script>
                    if(typeof window !== 'undefined') {
                        ${insideScript}
                    }
                    const md = ${JSON.stringify(outsideScript)};
                    const highlighted = ${JSON.stringify(highlighted)};
                    
                    </script>
                    {@html highlighted}

                    {@html md}`,
				};
			}
		},
	};
}
