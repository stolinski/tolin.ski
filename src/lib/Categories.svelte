<script lang="ts">
	const {
		categories,
	}: {
		categories: {
			name: string;
			slug: string;
			metadata: {
				icon: string;
			};
		}[];
	} = $props();
</script>

<h3 class="h6">Categories</h3>
<section>
	<ul>
		{#each categories as category}
			<li>
				<a href="/{category.slug}">{category?.metadata?.icon} {category.name}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		a {
			text-decoration: none;
			color: var(--fg);
		}
	}
</style>
