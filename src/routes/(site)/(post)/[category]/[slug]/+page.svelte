<script lang="ts">
	import PostTags from '$/lib/PostTags.svelte';
	import Excerpt from '$/lib/Excerpt.svelte';
	const { data } = $props();
	const Content = $derived(data.content);
</script>

<section class="layout-readable center" style="--layout-max-width: 72ch">
	<div class="stack post-page">
		<h1>{data.meta.title}</h1>
		<Excerpt slug={data.meta.slug} excerpt={data.meta.excerpt} view="PAGE" />
		<PostTags slug={data.meta.slug} tags={data.meta.tags} />
		<div class="post-content">
			<Content />
		</div>
	</div>
</section>

<style>
	.post-page {
		--layout-gap: var(--pad-l);
	}

	.post-content {
		margin-top: var(--vs-xl);
	}
</style>
