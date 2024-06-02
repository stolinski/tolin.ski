<script lang="ts">
	import Demo from '$/lib/Demo.svelte';
	import { on_client_mount } from '$lib/utils';

	const js = on_client_mount(() => {
		const trigger = document.getElementById('open_alert');
		const dialog = document.getElementById('alert_modal');

		trigger.addEventListener('click', () => {
			dialog.showModal();
		});
	});
</script>

<Demo {js}>
	<button id="open_alert">Remind Me</button>
	<dialog id="alert_modal">
		<h3>Stay Up to Date</h3>
		<form method="dialog">
			<button type="submit">Allow Notifications</button>
			<button class="close" type="reset">Close</button>
		</form>
	</dialog>
</Demo>

<style>
	button[type='submit'] {
		background: var(--bg);
		color: var(--fg);
	}
	button[type='reset'] {
		color: var(--bg);
	}
</style>
