<script lang="ts">
	const { tags, slug }: { tags: string[] | [string, number][]; slug?: string } = $props();

	type CountedTag = [string, number];

	function isCountedTags(value: string[] | CountedTag[]): value is CountedTag[] {
		// `tags` is always an array; we need to distinguish `string[]` from `[string, number][]`
		return value.length > 0 && Array.isArray(value[0]);
	}
</script>

<div class="cluster post-tags">
	{#if isCountedTags(tags)}
		{#each tags as [tag, count] (tag)}
			<a
				class="post-tag"
				style:--transition-name={slug ? `post-tags-${tag}-${slug}` : `post-tags-${tag}`}
				href="/tags/{tag}"
			>
				<span class="post-tag__label">#{tag}</span>
				<span class="post-tag__count" aria-label="{count} posts">{count}</span>
			</a>
		{/each}
	{:else}
		{#each tags as tag (tag)}
			<a
				class="post-tag"
				style:--transition-name={slug ? `post-tags-${tag}-${slug}` : `post-tags-${tag}`}
				href="/tags/{tag}"
			>
				<span class="post-tag__label">#{tag}</span>
			</a>
		{/each}
	{/if}
</div>


<style>
	.post-tags {
		--layout-gap: var(--pad-xs);
		--post-tag-pad-y: 0.35rem;
		--post-tag-pad-x: 0.65rem;
		--post-tag-font-size: 14px;
		--post-tag-bg: color-mix(in oklab, var(--bg), var(--fg) 7%);
		--post-tag-border: color-mix(in oklab, var(--fg), transparent 82%);
		--post-tag-bg-hover: color-mix(in oklab, var(--bg), var(--fg) 11%);
		--post-tag-border-hover: color-mix(in oklab, var(--fg), transparent 70%);
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.post-tag {
		text-decoration: none;
		margin: 0;
		background: var(--post-tag-bg);
		border: 1px solid var(--post-tag-border);
		padding: var(--post-tag-pad-y) var(--post-tag-pad-x);
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: var(--post-tag-font-size);
		line-height: 1;
		white-space: nowrap;
		transition: background 160ms ease, border-color 160ms ease, transform 160ms ease;
	}

	.post-tag:hover {
		background: var(--post-tag-bg-hover);
		border-color: var(--post-tag-border-hover);
		transform: translateY(-1px);
	}

	.post-tag:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	.post-tag__count {
		font-size: 12px;
		padding: 0.12rem 0.4rem;
		border-radius: 999px;
		background: color-mix(in oklab, var(--fg) 14%, transparent);
		border: 1px solid color-mix(in oklab, var(--fg), transparent 78%);
		opacity: 0.9;
	}
</style>
