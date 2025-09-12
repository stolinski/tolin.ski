<script lang="ts">
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

{#if !page.url.pathname.includes('/demos/')}
	<Footer />
{/if}

{#if theme.theme === 'level-up'}
	<svg
		transition:fade
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 100vw 700"
		width="100vw"
		height="700"
		opacity="1"
		><defs
			><linearGradient
				gradientTransform="rotate(154, 0.5, 0.5)"
				x1="50%"
				y1="0%"
				x2="50%"
				y2="100%"
				id="ffflux-gradient"
				><stop stop-color="#191324" stop-opacity="1" offset="0%"></stop><stop
					stop-color="#ff25be"
					stop-opacity="1"
					offset="100%"
				></stop></linearGradient
			><filter
				id="ffflux-filter"
				x="-20%"
				y="-20%"
				width="140%"
				height="140%"
				filterUnits="objectBoundingBox"
				primitiveUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.003 0.006"
					numOctaves="2"
					seed="2"
					stitchTiles="stitch"
					x="0%"
					y="0%"
					width="100%"
					height="100%"
					result="turbulence"
				></feTurbulence>
				<feGaussianBlur
					stdDeviation="0 0"
					x="0%"
					y="0%"
					width="100%"
					height="100%"
					in="turbulence"
					edgeMode="duplicate"
					result="blur"
				></feGaussianBlur>
				<feBlend
					mode="color-burn"
					x="0%"
					y="0%"
					width="100%"
					height="100%"
					in="SourceGraphic"
					in2="blur"
					result="blend"
				></feBlend>
			</filter></defs
		><rect width="100vw" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"
		></rect></svg
	>
{/if}
