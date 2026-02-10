<script lang="ts">
	import { getHighlighter } from '$/highlighter';
	import { browser } from '$app/environment';

	let { path } = $props();
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
			raw = `${raw}<style></style>`;
			return;
		} catch (error) {
			console.error(error);
		}
	}
</script>

{#if browser}
	<div class="demo stack">
		{#await importRawCode() then}
			<div class="demo-preview">
				<iframe class="demo-frame" srcdoc={raw} title="Demo preview"></iframe>
			</div>
			<div class="demo-code">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html shiki_code}
			</div>
		{:catch}
			<p>Error</p>
		{/await}
	</div>
{/if}

<style>
	.demo {
		--layout-gap: var(--pad-m);
	}

	.demo-preview {
		border: 1px solid color-mix(in oklab, var(--fg), transparent 86%);
		border-radius: var(--br-l);
		background: var(--tint-or-shade);
		overflow: hidden;
	}

	.demo-frame {
		display: block;
		width: 100%;
		min-height: clamp(18rem, 42vh, 32rem);
		border: 0;
		background: transparent;
	}

	.demo-code :global(pre.shiki) {
		margin: 0;
		overflow-x: auto;
		padding: var(--pad-m);
		border-radius: var(--br-l);
		border: 1px solid color-mix(in oklab, var(--fg), transparent 86%);
		font-size: 0.875rem;
		line-height: 1.5;
		max-width: 100%;
	}

	.demo-code :global(pre.shiki code) {
		padding: 0;
		background: transparent;
	}
</style>
