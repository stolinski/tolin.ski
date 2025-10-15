<script lang="ts">
	import PostTags from './PostTags.svelte';

	const {
		tags,
	}: {
		tags: [string, number][];
	} = $props();
</script>

<section class="stack">
	<h3 class="h6">Tags</h3>
	<PostTags {tags} />
</section>
