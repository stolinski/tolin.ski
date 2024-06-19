<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { browser } from '$app/environment';

	function oninput(e) {
		theme.theme = e.target.value || 'level-up';
	}
</script>

{#if browser}
	<label class="theme-select"
		>Theme
		<select value={theme.theme} {oninput} name="theme" id="theme">
			<option value="level-up">Level Up</option>
			<option value="syntax">Syntax</option>
		</select>
	</label>
{/if}

<style>
	.theme-select {
		text-align: right;
		font-size: var(--fs-xxxs);
		text-transform: uppercase;
		font-style: normal;
		opacity: 0.6;
		select {
			background: transparent;
			border: none;
			font-size: var(--fs-xxs);
		}
	}
</style>
