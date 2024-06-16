<script lang="ts">
	import { settings } from '$settings';
	import { theme } from '$lib/theme.svelte';

	function oninput(e) {
		theme.theme = e.target.value || 'level-up';
	}
</script>

<header class="layout">
	<div class="content">
		<p class="logo"><a href="/">{settings.app_name}</a></p>
		<nav>
			<!-- Add your nav -->
			<ul>
				<li><a href="/">Blog</a></li>
				<li><a href="/demos">Demos</a></li>
				<li><a href="/uses">Uses</a></li>
				<!-- <li><a href="/rss.xml">Feed</a></li> -->
			</ul>
		</nav>
		<label class="theme-select"
			>Theme
			<select {oninput} name="theme" id="theme">
				<option value="level-up">Level Up</option>
				<option value="syntax">Syntax</option>
			</select>
		</label>
	</div>
</header>

<style>
	.logo {
		font-style: italic;
	}

	.content {
		display: grid;
		grid-template-columns: 25% 50% 25%;
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

	nav ul {
		list-style: none;
		margin: 0;
		justify-content: center;
		padding: 0;
		display: flex;
		gap: 25px;
	}
	nav ul li {
		font-size: var(--fs-xs);
		text-transform: lowercase;
	}

	.theme-select {
		text-align: right;
	}
</style>
