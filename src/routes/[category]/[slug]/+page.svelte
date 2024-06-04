<script lang="ts">
	import PostTags from '$/lib/PostTags.svelte';

	const { data } = $props();
</script>

<div class="layout full" style:--max-width="1000px" style:--side-bar-width="200px">
	<section class="content">
		<h1 style:--transition-name="post-title-{data.meta.slug}">{data.meta.title}</h1>
		<PostTags tags={data.meta.tags} />
		<svelte:component this={data.content} />
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
