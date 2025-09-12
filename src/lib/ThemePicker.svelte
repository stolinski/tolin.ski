<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { browser } from '$app/environment';

	function oninput(e) {
		theme.theme = e.target.value || 'level-up';
	}
</script>

<label>
	Theme
	<select value={theme.theme} {oninput} name="theme" id="theme">
		<option value="level-up">Level Up</option>
		<option value="syntax">Syntax</option>
	</select>
</label>
