<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	import PostListing from '$lib/PostListing.svelte';
	const { data } = $props();
</script>

<div class="layout-sidebar-inverse full" style:--max-width="1200px" style:--side-bar-width="20%">
	<section class="content">
		<p class="mini-title">Tag</p>
		<h1 class="title">{data.tag}</h1>
		{#if data.posts.length > 0}
			{#each data.posts as post}
				<PostListing {post} />
			{/each}
		{/if}
	</section>

	<aside class="sidebar">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>

<style>
	.title {
		view-transition-name: slide;
	}

	@keyframes slide {
		from {
			translate: -20vi;
			opacity: 0;
		}
	}

	::view-transition-old(slide) {
		animation: 300ms ease-in reverse forwards slide;
	}

	::view-transition-new(slide) {
		animation: 300ms ease-out forwards slide;
	}
</style>
