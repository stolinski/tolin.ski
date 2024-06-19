<script lang="ts">
	import { settings } from '$settings';
	import { theme } from '$lib/theme.svelte';
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';

	function oninput(e) {
		theme.theme = e.target.value || 'level-up';
	}
</script>

<header class="layout">
	<div class="content">
		<!-- <nav> -->
		<!-- Add your nav -->
		<!-- <ul> -->
		<!-- <li><a href="/">Blog</a></li> -->
		<!-- <li><a href="/demos">Demos</a></li> -->
		<!-- <li><a href="/uses">Uses</a></li> -->
		<!-- <li><a href="/rss.xml">Feed</a></li> -->
		<!-- </ul> -->
		<!-- </nav> -->
		<p class="logo"><a href="/">{settings.app_name}</a></p>
		{#if browser}
			<label class="theme-select" transition:fade
				>Theme
				<select value={theme.theme} {oninput} name="theme" id="theme">
					<option value="level-up">Level Up</option>
					<option value="syntax">Syntax</option>
				</select>
			</label>
		{/if}
	</div>
</header>

<style>
	.logo {
		font-style: normal;
		font-size: var(--fs-xs);
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
		font-size: var(--fs-xxs);
		select {
			font-size: var(--fs-xxs);
		}
	}
</style>
