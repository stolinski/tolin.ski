<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	const { data, children } = $props();
</script>

<div class="layout-sidebar-inverse full" style:--max-width="1200px" style:--side-bar-width="20%">
	<section class="content">
		{@render children()}
	</section>

	<aside class="sidebar">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>


