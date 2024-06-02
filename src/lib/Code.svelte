<script lang="ts">
	import { getHighlighter, type BundledLanguage } from 'shiki';

	const { code, lang }: { code: string; lang: BundledLanguage } = $props();

	async function start() {
		try {
			const highlighter = await getHighlighter({
				themes: ['dark-plus'],
				langs: ['html', 'js', 'css', 'svelte'],
			});

			function transform(file_content: string) {
				const highlighted = highlighter.codeToHtml(file_content, {
					lang,
					theme: 'dark-plus',
				});
				return highlighted;
			}

			return transform(code);
		} catch (e) {
			console.error(e);
		}
	}
	if (code) start();
</script>

{#await start() then shi}
	{@html shi}
{/await}
