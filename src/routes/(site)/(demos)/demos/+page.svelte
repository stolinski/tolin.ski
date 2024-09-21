<script lang="ts">
	const { data } = $props();
</script>

<h1>All Demos</h1>

{#each Object.entries(data.demos) as [parent, children]}
	<h2>{parent}</h2>
	<ul>
		{#each children as child}
			<li><a href={`/demos/${child.path}`}>{child.name}</a></li>
		{/each}
	</ul>
{/each}
