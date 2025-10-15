<script lang="ts">
	import PostListing from '$lib/PostListing.svelte';
	const { data } = $props();
</script>


<h1>{data.tag}</h1>
<section>
    {#if data.posts.length > 0}
    	{#each data.posts as post}
    		<PostListing {post} />
    	{/each}
    {/if}
</section>
