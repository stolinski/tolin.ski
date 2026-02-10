<script lang="ts">
	import PostListing from '$/lib/PostListing.svelte';

	const { data } = $props();
	const Content = $derived(data.content);
</script>

<div class="stack">
	<div class="stack">
		<p class="fs-xs">Category</p>
		<h1>{data.category}</h1>
		<div class="post-content">
			<Content />
		</div>
	</div>

	{#if data.posts.length > 0}
		<div class="stack">
			{#each data.posts as post (post.slug)}
				<PostListing {post} />
			{/each}
		</div>
	{:else}
		<p>No posts in this category yet.</p>
	{/if}
</div>
