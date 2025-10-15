<script lang="ts">
	import '@drop-in/graffiti';
	import './styles.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { theme } from '$lib/theme.svelte';
	import { fade } from 'svelte/transition';
	import HomeHeader from '$lib/HomeHeader.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	$effect(() => {
		theme.load_state();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if page.url.pathname == '/'}
	<HomeHeader />
{:else}
	<Header />
{/if}

<main id="main">
	<div>
		{@render children()}
	</div>
</main>

<Footer />
