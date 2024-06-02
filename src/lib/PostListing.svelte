<script lang="ts">
	import type { Post } from '$types/types';
	const { post }: { post: Post } = $props();
</script>

<article>
	<h2 style:--transition-name="post-title-{post.slug}">{post.title}</h2>
	<p class="date">{post.date}</p>
	<p>{@html post.excerpt}</p>
	<p><a href="/{post.category}/{post.slug}">Read more</a></p>
</article>

<style>
	article {
		margin-bottom: 4rem;
	}

	h2 {
		margin-block: 4rem 0;
	}

	.date {
		font-style: italic;
		opacity: 0.6;
	}
</style>
