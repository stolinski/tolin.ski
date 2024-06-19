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

<h3 class="mini-title">Categories</h3>
<section class="categories">
	<ul class="no-list">
		{#each categories as category}
			<li>
				<a href="/{category.slug}">{category?.metadata?.icon} {category.name}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.categories {
		margin-bottom: 2rem;
	}

	li {
		margin-bottom: 0.5rem;
		font-size: var(--fs-xxs);
	}

	a {
		color: var(--fg);
		text-decoration: none;
	}
</style>
