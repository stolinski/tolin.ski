<script lang="ts">
	import PostTags from './PostTags.svelte';

	const {
		tags,
	}: {
		tags: [string, number][];
	} = $props();
</script>

<section class="tags">
	<h3 class="mini-title">Tags</h3>
	<ul class="no-list">
		<PostTags {tags} />
	</ul>
</section>
