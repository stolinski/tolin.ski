<script lang="ts">
	const { excerpt, slug, view }: { excerpt: string; slug: string; view: 'PAGE' | 'LIST' } =
		$props();
</script>

<div style:--transition-name="post-excerpt-{slug}">
	{@html excerpt}
</div>
