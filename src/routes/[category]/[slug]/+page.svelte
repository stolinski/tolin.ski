<script lang="ts">
	const { data } = $props();
</script>

<div class="layout full" style:--max-width="1000px" style:--side-bar-width="200px">
	<section class="content">
		<h1 style:--transition-name="post-title-{data.meta.slug}">{data.meta.title}</h1>
		<div class="post-tags">
			{#each data.meta.tags as tag}
				<a href="/tags/{tag}">#{tag}</a>
			{/each}
		</div>
		<svelte:component this={data.content} />
	</section>
</div>

<style>
	h1 {
		font-size: var(--fs-xxxl);
		text-align: center;
		line-height: 1.2;
		font-style: italic;
	}

	.post-tags a {
		color: var(--fg);
		text-decoration: none;
		padding: 4px;
		border-radius: 4px;
		background: rgb(255 255 255 / 0.1);
	}
</style>
