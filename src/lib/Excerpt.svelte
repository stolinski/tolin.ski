<script lang="ts">
	const { excerpt, slug, view }: { excerpt: string; slug: string; view: 'PAGE' | 'LIST' } =
		$props();
</script>

<div class="excerpt stack" data-view={view}>
	{@html excerpt}
</div>

<style>
	.excerpt {
		--layout-gap: var(--pad-s);
		color: var(--fg);
	}

	.excerpt[data-view='LIST'] {
		opacity: 0.9;
	}

	.excerpt :global(a) {
		text-underline-offset: 0.18em;
	}
</style>
