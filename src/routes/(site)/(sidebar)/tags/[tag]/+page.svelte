<script lang="ts">
	import PostListing from '$lib/PostListing.svelte';
	const { data } = $props();
</script>

<div class="stack">
	<h1>{data.tag}</h1>
	<section class="stack">
		{#if data.posts.length > 0}
			{#each data.posts as post (post.slug)}
				<PostListing {post} />
			{/each}
		{:else}
			<p>No posts for this tag yet.</p>
		{/if}
	</section>
</div>
