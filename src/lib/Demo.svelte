<script lang="ts">
	import Code from "./Code.svelte";
	import { make_code_string } from "./utils";

	const { children, js } = $props();
	let element: HTMLDivElement | undefined = $state();

	let code_string = $derived(make_code_string(js, element?.innerHTML!));
</script>

{#if element?.innerHTML}
	{#await code_string then cs}
		<Code code={cs} lang="html" />
	{/await}
{/if}

<div bind:this={element}>
	{@render children()}
</div>