<script lang="ts">
	const { tags, slug }: { tags: string[] | [string, number][]; slug?: string } = $props();
</script>

<div>
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
