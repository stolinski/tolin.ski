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
	import { settings } from '$settings';

	let { children } = $props();

	const title = $derived(page.data.title ?? settings.app_name);
	const og_image = $derived(
		`${page.url.origin}/og${page.url.pathname === '/' ? '/index' : page.url.pathname}.png`,
	);

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
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:image" content={og_image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
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
