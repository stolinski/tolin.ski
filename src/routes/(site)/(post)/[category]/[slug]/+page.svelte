<script lang="ts">
	import PostTags from '$/lib/PostTags.svelte';
	import Excerpt from '$/lib/Excerpt.svelte';
	const { data } = $props();
</script>

<div class="layout full" style:--max-width="1000px" style:--side-bar-width="200px">
	<section class="content">
		<div class="read">
			<h1 style:--transition-name="post-title-{data.meta.slug}">{data.meta.title}</h1>
			<Excerpt slug={data.meta.slug} excerpt={data.meta.excerpt} view="PAGE" />
			<PostTags slug={data.meta.slug} tags={data.meta.tags} />
			<svelte:component this={data.content} />
		</div>
	</section>
</div>

<style>
	h1 {
		font-size: var(--fs-xxxl);
		text-align: center;
		line-height: 1.2;
		font-style: italic;
	}
</style>
