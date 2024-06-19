<script lang="ts">
	import ThemePicker from '$/lib/ThemePicker.svelte';
	import { settings } from '$settings';
</script>

<header class="layout">
	<div class="content header-content">
		<ThemePicker />
	</div>
	<section class="content">
		<h1 class="site-title" style:--transition-name="scott-tolinski">{settings.app_name}</h1>
	</section>
</header>

<style>
	.header-content {
		display: flex;
		justify-content: end;
		align-items: center;
		padding-block: 0.5rem;
	}

	.site-title {
		font-size: var(--fs-xxxl);
		text-align: center;
		line-height: 1.2;
		font-style: italic;
	}
</style>
