import { createHighlighter } from 'shiki';
import syntax_theme from '$/syntax.js';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export async function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [syntax_theme],
			langs: ['html'],
		});
	}
	return highlighterPromise;
}
