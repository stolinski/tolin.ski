<script lang="ts">
	import type { Post } from '$types/types';
	import Excerpt from './Excerpt.svelte';
	import PostTags from './PostTags.svelte';
	const { post }: { post: Post } = $props();
</script>

<article>
	<h2 style:--transition-name="post-title-{post.slug}">{post.title}</h2>
	<p class="date">{post.date}</p>
	<Excerpt slug={post.slug} excerpt={post.excerpt} view="LIST" />
	<PostTags slug={post.slug} tags={post.tags} />
	<p>
		<a href="/{post.category}/{post.slug}">Read more</a>
	</p>
</article>

<style>
	article {
		margin-bottom: 4rem;
	}

	h2 {
		margin-block: 4rem 0;
	}

	.date {
		font-variation-settings: 'wght' 100;
		font-style: italic;
		opacity: 0.6;
		font-size: var(--fs-xs);
	}
</style>
