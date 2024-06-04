<script lang="ts">
	import "@drop-in/theme";
	import './app.css';
	import Header from '$routes/Header.svelte';
	import Footer from '$routes/Footer.svelte';
	import { onNavigate } from '$app/navigation'
	let { children } = $props()
 
	onNavigate((navigation) => {

		if (!document.startViewTransition) return
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

</script>

<Header />

<main>
<div class="layout">
	{@render children()}
</div>
</main>


<Footer />
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 100vw 700" width="100vw" height="700" opacity="1"><defs><linearGradient gradientTransform="rotate(154, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="#191324" stop-opacity="1" offset="0%"></stop><stop stop-color="#ff25be" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.003 0.006" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="0 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="color-burn" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="100vw" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>

<!-- <svg style="position: fixed; top: 0; left: 0; right: 0;" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 100vw 700" width="100vw" height="700"><defs><linearGradient gradientTransform="rotate(148, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="#191324" stop-opacity="1" offset="0%"></stop><stop stop-color="#ff25be" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.003 0.006" numOctaves="1" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
  <feGaussianBlur stdDeviation="0 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
  <feBlend mode="color-burn" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
  
</filter></defs><rect width="100vw" height="700px" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg> -->

<style>

	main {
		border-top: 1px solid rgb(255 255 255 / 0.1);
	}
	svg {
		  position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    mask-image: linear-gradient(to bottom, black, transparent 80%);
    opacity: 0.3;
	}
</style>