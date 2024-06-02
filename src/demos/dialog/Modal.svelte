<script lang="ts">
	import Demo from '$/lib/Demo.svelte';
	import { on_client_mount } from '$lib/utils';

	const js = on_client_mount(() => {
		const trigger = document.getElementById('open_modal');
		const dialog = document.getElementById('modal');
		trigger.addEventListener('click', () => {
			dialog.showModal();
		});
	});
</script>

<Demo {js}>
	<button id="open_modal">Open</button>
	<dialog id="modal">
		<p>Login</p>
		<form method="alert">
			<input type="text" placeholder="password" />
			<button type="submit">Login</button>
		</form>
	</dialog>
</Demo>
