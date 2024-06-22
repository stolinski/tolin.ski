<script>
	import PostListing from '$/lib/PostListing.svelte';

	const { data } = $props();
</script>

<div class="disclaimer">
	<p>
		Hi, I'm Scott Tolinski. This site is under construction and a WIP. If you are interested in
		learning more about this codebase, check it out on <a
			href="https://github.com/stolinski/tolin.ski"
			target="_blank">Github</a
		>
	</p>

	<p>
		Things will be broken and not great looking, but steadily improving as I work on this. It's less
		than a week or two old
	</p>
</div>

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

<style>
	.disclaimer p {
		font-size: var(--fs-xs);
	}
</style>
