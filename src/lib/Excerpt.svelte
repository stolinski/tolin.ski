<script lang="ts">
	const { excerpt, slug, view }: { excerpt: string; slug: string; view: 'PAGE' | 'LIST' } =
		$props();
</script>

<div class={view} class:readable={view === 'PAGE'} style:--transition-name="post-excerpt-{slug}">
	{@html excerpt}
</div>

<style>
	div {
		view-transition-name: var(--transition-name);
	}

	.PAGE {
		text-align: center;
	}

	.PAGE :global(*) {
		font-size: var(--fs-l);
	}
</style>
