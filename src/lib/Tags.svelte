<script lang="ts">
	import PostTags from './PostTags.svelte';

	const {
		tags,
	}: {
		tags: [string, number][];
	} = $props();
</script>

<section class="stack sidebar-tags">
	<h3 class="h6">Tags</h3>
	<PostTags {tags} />
</section>

<style>
	.sidebar-tags :global(.post-tags) {
		--layout-gap: var(--pad-xs);
	}

	.sidebar-tags :global(.post-tag) {
		--post-tag-font-size: 13px;
		--post-tag-pad-y: 0.32rem;
		--post-tag-pad-x: 0.55rem;
	}

	.sidebar-tags :global(.post-tag__count) {
		font-size: 11px;
	}
</style>
