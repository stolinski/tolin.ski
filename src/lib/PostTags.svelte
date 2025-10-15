<script lang="ts">
	const { tags, slug }: { tags: string[] | [string, number][]; slug?: string } = $props();
</script>

<div class="layout-cluster">
	{#if tags instanceof Map}
		{#each tags as [tag, count]}
			<a href="/tags/{tag}">#{tag}</a>
		{/each}
	{:else}
		{#each tags as tag}
			<a style:--transition-name="post-tags-{tag}-{slug}" href="/tags/{tag}">#{tag}</a>
		{/each}
	{/if}
</div>


<style>
    a {
        text-decoration: none;
        background: var(--tint-or-shade-harder);
        padding: var(--pad-s) var(--pad-m);
        border-radius: var(--br-m);
        display: inline-block;
        font-size: 14px;

    }
</style>
