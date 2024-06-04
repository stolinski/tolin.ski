<script lang="ts">
	import Categories from '$lib/Categories.svelte';
	import PostListing from '$lib/PostListing.svelte';
	import Tags from '$lib/Tags.svelte';
	import { settings } from '$settings';

	const { data } = $props();
</script>

<div class="layout-sidebar-inverse full" style:--max-width="1100px" style:--side-bar-width="200px">
	<section class="content">
		<h1 class="visually-hidden">{settings.app_name}</h1>

		<p>
			Hi, I'm Scott Tolinski. This site is under construction and a WIP. If you are interested in
			learning more about this codebase, check it out on <a
				href="https://github.com/stolinski/tolin.ski"
				target="_blank">Github</a
			>
		</p>
		<p>Things will be broken and not great looking, but steadly improving as I work on this.</p>

		{#each data.posts as post}
			<PostListing {post} />
		{/each}
	</section>

	<aside class="sidebar">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>

<iframe src="http://localhost:5173/cool-treats/dialog" width="100%"></iframe>
