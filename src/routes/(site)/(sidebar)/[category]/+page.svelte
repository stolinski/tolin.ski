<script lang="ts">
	import PostListing from '$/lib/PostListing.svelte';

	const { data } = $props();
</script>

<p>Category</p>
<h1>{data.category}</h1>
<div>
	{data.content}
</div>
{#if data.posts.length > 0}
	{#each data.posts as post}
		<PostListing {post} />
	{/each}
{:else}
	<p>No posts in this category yet.</p>
{/if}
