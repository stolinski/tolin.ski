<script lang="ts">
	import PostTags from './PostTags.svelte';

	const {
		tags,
	}: {
		tags: [string, number][];
	} = $props();
</script>

<section>
	<h3>Tags</h3>
	<PostTags {tags} />
</section>
