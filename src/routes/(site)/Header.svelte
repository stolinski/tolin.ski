<script lang="ts">
	import ThemePicker from '$/lib/ThemePicker.svelte';
	import { settings } from '$settings';
</script>

<header class="layout">
	<div class="content">
		<p class="logo" style:--transition-name="scott-tolinski"><a href="/">{settings.app_name}</a></p>
		<ThemePicker />
	</div>
</header>

<style>
	.logo {
		font-style: normal;
		font-size: var(--fs-xs);
		font-family: '🆒';
		text-transform: uppercase;
		font-variation-settings: 'wght' 900;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 0.5rem;
	}

	header {
		border-bottom: 1px solid rgb(0 0 0 / 0.5);
	}

	header a {
		color: var(--fg);
		text-decoration: none;
	}

	p {
		margin: 0;
	}
</style>
