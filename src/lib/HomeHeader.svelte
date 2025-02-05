<script lang="ts">
	import ThemePicker from '$/lib/ThemePicker.svelte';
	import { settings } from '$settings';
</script>

<header class="layout">
	<div class="content header-content">
		<div>
			<a href="https://syntax.fm">The Syntax Podcast</a>
			<a href="https://github.com/stolinski">GitHub</a>
		</div>
		<ThemePicker />
	</div>
	<section class="content billboard">
		<h1 class="site-title" style:--transition-name="scott-tolinski">{settings.app_name}</h1>
		<p class="pre-title readable">
			Hey, what's up? I'm Scott, the Co-host of Syntax.fm and creator of Level Up Tutorials
		</p>
	</section>
</header>

<style>
	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 0.5rem;
	}

	.site-title {
		font-size: var(--fs-xxxl);
		text-align: center;
		line-height: 1.2;
		font-style: italic;
	}

	.pre-title {
		margin-inline: auto;
		font-size: var(--fs-l);
		text-align: center;
	}
	.billboard {
		margin-bottom: 5rem;
	}
</style>
