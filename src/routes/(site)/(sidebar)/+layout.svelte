<script lang="ts">
	import Tags from '$lib/Tags.svelte';
	import Categories from '$lib/Categories.svelte';
	const { data, children } = $props();
</script>

<div style:--max-width="1200px" style:--side-bar-width="20%">
	<section>
		<div>
			{@render children()}
		</div>
	</section>

	<aside>
		<Categories categories={data.categories} />
		<Tags tags={data.tags} />
	</aside>
</div>
