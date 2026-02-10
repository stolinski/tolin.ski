<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { browser } from '$app/environment';

	function oninput(e: Event) {
		const value = (e.target as HTMLSelectElement).value;
		theme.theme = (value === 'syntax' || value === 'level-up') ? value : 'level-up';
	}
</script>

<label>
	Theme
	<select value={theme.theme} {oninput} name="theme" id="theme">
		<option value="level-up">Level Up</option>
		<option value="syntax">Syntax</option>
	</select>
</label>
