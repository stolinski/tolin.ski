<script lang="ts">
	const { data } = $props();
</script>

<!-- Load bearing div -->
<div>
	<svelte:component this={data.content} />
</div>

<style>
	div {
		padding-block: 1rem;
	}

	:global(iframe) {
		width: 100%;
	}
</style>
