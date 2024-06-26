import pretty from 'pretty';
import js_beautify from 'js-beautify';
import { onMount } from 'svelte';

function format_js(code: string) {
	// Regex to match the wrapping arrow function and capture the inner code
	const regex = /^\s*\(\s*\)\s*=>\s*{\s*([\s\S]*?)\s*}\s*$/;
	const match = code.match(regex);

	// Return the captured inner code if match is found, otherwise return original code
	const innerCode = match ? match[1].trim() : code;

	// Format the inner code using Prettier
	const formattedCode = js_beautify(innerCode);

	return formattedCode
		.split('\n')
		.map((line) => '  ' + line)
		.join('\n');
}

export function on_client_mount(funk: (unknown?: unknown) => unknown): string {
	const funk_str = funk.toString();
	const formatted = format_js(funk_str);
	if (typeof window !== 'undefined') {
		onMount(() => {
			funk();
		});
	}

	return formatted;
}

function add_newlines(html: string) {
	// Add newline after closing tags and self-closing tags
	if (html) {
		const formattedHtml = html
			.replace(/<!--\[\-->|<!--\]-->/g, '')
			.replace(/(<\/[^>]+>)(?=\s*<|$)/g, '$1\n')
			.replace(/(<[^\/>]+\/>)(?=\s*<|$)/g, '$1\n')
			.replace(/>\s*</g, '>\n<');

		return formattedHtml.trim();
	}
	return '';
}

export async function make_code_string(js: string, html: string) {
	try {
		const html_string = await pretty(add_newlines(html));
		return `<script>
${js}
<\/script>

${html_string}`;
	} catch (e) {
		console.error(e);
	}
}
