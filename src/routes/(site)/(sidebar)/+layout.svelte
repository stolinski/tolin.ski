<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	const { data, children } = $props();
</script>

<div class="sub full" style:--max-width="1200px" style:--side-bar-width="20%">
	<section class="invert-main col">
		{@render children()}
	</section>

	<aside class="invert-sidebar col">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>


