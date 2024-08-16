<script>
	import PostListing from '$/lib/PostListing.svelte';

	const { data } = $props();
</script>

{#if data.posts?.length > 0}
	{#each data?.posts as post}
		<PostListing {post} />
	{/each}
{:else}
	<p>No posts in this category yet.</p>
{/if}

<iframe
	loading="lazy"
	title="The Origins of Level Up Tutorials"
	width="100%"
	class="youtube"
	src={`https://www.youtube.com/embed/Q9eh2iJsjxE`}
	frameborder="0"
	allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
>
</iframe>
