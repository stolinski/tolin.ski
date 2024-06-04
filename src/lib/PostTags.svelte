<script lang="ts">
	const { tags }: { tags: string[] } = $props();
</script>

<div class="post-tags">
	{#each tags as tag}
		<a href="/tags/{tag}">#{tag}</a>
	{/each}
</div>

<style>
	.post-tags a {
		color: var(--fg);
		text-decoration: none;
		padding: 4px;
		border-radius: 4px;
		background: rgb(255 255 255 / 0.1);
	}
</style>
