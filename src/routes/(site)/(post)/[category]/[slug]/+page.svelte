<script lang="ts">
	import PostTags from '$/lib/PostTags.svelte';
	import Excerpt from '$/lib/Excerpt.svelte';
	const { data } = $props();
</script>

<div style:--max-width="1000px" style:--side-bar-width="200px">
	<section>
		<div>
			<h1 style:--transition-name="post-title-{data.meta.slug}">{data.meta.title}</h1>
			<Excerpt slug={data.meta.slug} excerpt={data.meta.excerpt} view="PAGE" />
			<PostTags slug={data.meta.slug} tags={data.meta.tags} />
			<svelte:component this={data.content} />
		</div>
	</section>
</div>
