import { createHighlighter } from 'shiki';

/** @type {Promise<Awaited<ReturnType<typeof createHighlighter>>> | null} */
let highlighterPromise = null;

/**
 * @param {{themes?: string[], langs?: string[]}} options
 */
export async function getHighlighter(options = {}) {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: options.themes || ['night-owl'],
			langs: options.langs || ['html', 'javascript', 'typescript', 'css', 'svelte', 'jsx'],
		});
	}
	return highlighterPromise;
}
