<script lang="ts">
	import Iframe from '$/lib/Iframe.svelte';
	const { data } = $props();
</script>

<!-- Load bearing div -->
<div>
	<Iframe path={data.file_name} />
</div>

<style>
	div {
		padding-block: 1rem;
	}

	:global(iframe) {
		width: 100%;
	}
</style>
