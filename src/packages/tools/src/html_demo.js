import { getHighlighter } from 'shiki';

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
export function html_demo(options = { theme: default_theme }) {
	return {
		name: 'html_demos',
		async markup({ content, filename }) {
			if (
				(filename?.endsWith('.demo') || filename?.endsWith('.html')) &&
				content.includes('<!-- DEMO -->')
			) {
				const { insideScript, outsideScript } = parseContent(content);

				// Removes comment at top of file
				const content_without_demo_comment = content.replace('<!-- DEMO -->\n', '');

				const highlighted = await transform(content_without_demo_comment, options.theme);
				return {
					code: `<script>
	import { onMount } from 'svelte';
	if(typeof window !== 'undefined') {
		onMount(() => {
			${insideScript}
		})
	}
	const md = ${JSON.stringify(outsideScript)};
	const highlighted = ${JSON.stringify(highlighted)};

	</script>
	{@html md}
	{@html highlighted}
`,
				};
			}
		},
	};
}
