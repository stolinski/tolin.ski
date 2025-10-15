<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	const { data, children } = $props();
</script>

<div class="layout-sidebar wide invert">
	<section>
		<div>
			{@render children()}
		</div>
	</section>

	<aside class="stack">
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>
