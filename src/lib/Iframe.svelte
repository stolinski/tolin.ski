<script lang="ts">
	import { getHighlighter } from '$/highlighter';
	import css from '@drop-in/graffiti/raw';
	import { browser } from '$app/environment';

	let { path } = $props();
	console.log('path', path);
	let raw: string = $state('');
	let shiki_code: string = $state('');
	async function importRawCode() {
		try {
			raw = (await import(`$/demo/${path}.html?raw`)).default;
			const highlighter = await getHighlighter();
			const html = await highlighter.codeToHtml(raw, {
				lang: 'html',
				theme: 'syntax',
			});
			shiki_code = html;
			raw = `${raw}<style>${css}</style>`;
			return;
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if browser}
	<div>
		{#await importRawCode() then}
			<div>
				<iframe srcdoc={raw} frameborder="0"></iframe>
			</div>
			{@html shiki_code}
		{:catch}
			<p>Error</p>
		{/await}
	</div>
{/if}
