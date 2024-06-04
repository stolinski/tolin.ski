<script lang="ts">
	const { tags, slug }: { tags: string[] | [string, number][]; slug?: string } = $props();
</script>

<div class="post-tags">
	{#if tags instanceof Map}
		{#each tags as [tag, count]}
			<a href="/tags/{tag}">#{tag} <span>{count}</span></a>
		{/each}
	{:else}
		{#each tags as tag}
			<a style:--transition-name="post-tags-{tag}-{slug}" href="/tags/{tag}">#{tag}</a>
		{/each}
	{/if}
</div>

<style>
	.post-tags {
		display: flex;
		gap: 8px;
		align-items: center;
		flex-wrap: wrap;
	}

	.post-tags a {
		view-transition-name: var(--transition-name);
		color: var(--fg);
		text-decoration: none;
		padding: 4px;
		border-radius: 4px;
		background: rgb(255 255 255 / 0.1);
	}
</style>
