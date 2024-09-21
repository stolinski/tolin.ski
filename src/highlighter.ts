import { createHighlighter } from 'shiki';
import syntax_theme from '$/syntax.js';

export async function getHighlighter() {
	return createHighlighter({
		themes: [syntax_theme],
		langs: ['html'],
	});
}
