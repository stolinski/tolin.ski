<script lang="ts">
	import type { Post } from '$types/types';
	import Excerpt from './Excerpt.svelte';
	import PostTags from './PostTags.svelte';
	const { post }: { post: Post } = $props();
</script>

<article class="stack post-listing">
	<h2>
		<a href="/{post.category}/{post.slug}">{post.title}</a>
	</h2>
	<p class="post-meta fs-xs">
		<time>{post.date}</time>
	</p>
	<Excerpt slug={post.slug} excerpt={post.excerpt} view="LIST" />
	<PostTags slug={post.slug} tags={post.tags} />
</article>

<style>
	.post-listing {
		--layout-gap: var(--pad-m);
		padding-block: var(--pad-l);
		border-block-end: 1px solid color-mix(in oklab, var(--fg), transparent 86%);
	}

	.post-listing:first-child {
		padding-block-start: 0;
	}

	h2 a {
		text-decoration: none;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.18em;
	}

	h2 a:hover {
		text-decoration-line: underline;
	}

	.post-meta {
		opacity: 0.75;
	}
</style>
