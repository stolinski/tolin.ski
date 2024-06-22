<script lang="ts">
	import PostListing from '$/lib/PostListing.svelte';

	const { data } = $props();
</script>

<p class="mini-title category">Category</p>
<h1 class="title">{data.category}</h1>
<div class="category-description">
	<svelte:component this={data.content} />
</div>
{#if data.posts.length > 0}
	{#each data.posts as post}
		<PostListing {post} />
	{/each}
{:else}
	<p>No posts in this category yet.</p>
{/if}

<style>
	.category-description {
		font-size: var(--fs-xs);
		font-style: italic;
		opacity: 0.8;
	}
</style>
