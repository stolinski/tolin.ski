<script lang="ts">
	import { getHighlighter } from '$/highlighter';
	import css from '@drop-in/graffiti/raw';

	import css_base from '../routes/(site)/app.css?raw';
	import { browser } from '$app/environment';

	let { path } = $props();
	console.log('path', path);
	let raw: string = $state('');
	let shiki_code: string = $state('');
	// Import raw code from path
	async function importRawCode() {
		try {
			raw = (await import(`$/demo/${path}.html?raw`)).default;
			const highlighter = await getHighlighter();
			const html = await highlighter.codeToHtml(raw, {
				lang: 'html',
				theme: 'syntax',
			});
			shiki_code = html;
			raw = `${raw}<style>${css}${css_base}</style>`;
			return;
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if browser}
	<div class="code-side">
		{#await importRawCode() then}
			<div class="iframe">
				<iframe srcdoc={raw} frameborder="0"></iframe>
			</div>
			{@html shiki_code}
		{:catch}
			<p>Error</p>
		{/await}
	</div>
{/if}

<style>
	iframe {
		padding: var(--pad-m);
		border-radius: var(--rad-l);
		box-shadow: 4px 3px 10px rgb(0 0 0 / 0.3);
		width: 100%;
		border: 1px solid rgb(255 255 255 / 0.1);
		height: 100%;
		min-height: 500px;
		max-height: 500px;
	}
	.code-side {
		display: grid;
		gap: 10px;
		grid-template-columns: 0.8fr 1.2fr;
		& > :global(*) {
			margin: 0;
		}
	}
</style>
