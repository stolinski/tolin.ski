<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	const { data, children } = $props();
</script>

<div class="layout-sidebar wide invert sidebar-layout">
	<aside class="stack">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>

	<section>
		<div>
			{@render children()}
		</div>
	</section>
</div>

<style>
	@media (width < 768px) {
		.sidebar-layout > section {
			grid-row: 1;
		}
		.sidebar-layout > aside {
			grid-row: 2;
		}
	}
</style>
