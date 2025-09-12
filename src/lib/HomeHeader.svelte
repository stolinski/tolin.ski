<script lang="ts">
	import ThemePicker from '$/lib/ThemePicker.svelte';
	import { settings } from '$settings';
</script>

<header>
	<div>
		<div>
			<a href="https://syntax.fm">The Syntax Podcast</a>
			<a href="https://github.com/stolinski">GitHub</a>
		</div>
		<ThemePicker />
	</div>
	<section>
		<h1 style:--transition-name="scott-tolinski">{settings.app_name}</h1>
		<p>
			Hey, what's up? I'm Scott, the Co-host of Syntax.fm and creator of Level Up Tutorials
		</p>
	</section>
</header>
