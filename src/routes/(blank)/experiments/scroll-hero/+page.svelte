<div class="scope">
	<div class="wrapper">
		<section id="section1">
			<div class="container">
				<h1>Scroll Animations Demo</h1>
			</div>
		</section>
		<section id="section2">
			<div class="container">
				<h2>Hi, this is neat</h2>
			</div>
		</section>
		<section id="section3">
			<div class="container">
				<h2>A big ole scrollin' zone</h2>
			</div>
		</section>
		<section id="section4">
			<div class="container">
				<h2>No JavaScript</h2>
			</div>
		</section>
	</div>
	<div class="indicators">
		<a style="--i: 1" href="#section1"></a><a style="--i: 2" href="#section2"></a><a
			style="--i: 3"
			href="#section3"
		></a><a style="--i: 4" href="#section4"></a>
	</div>
</div>

<style>
	.scope {
		timeline-scope: --scroller;
		--total_slides: 4;
	}

	.wrapper {
		scroll-snap-type: y mandatory;
		overscroll-behavior-y: contain;
		overflow: auto;
		font-size: 5vw;
		font-family: system-ui, sans-serif;
		height: 100vh;
		scroll-timeline: --scroller y;
	}

	section {
		height: 100vb;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		scroll-snap-align: start;
	}

	.container {
		@media (prefers-reduced-motion: no-preference) {
			@supports (animation-timeline: scroll()) {
				animation: reveal linear both;
				animation-timeline: view(block);
				animation-range: cover 20% cover 80%;
			}
		}
	}

	@keyframes reveal {
		0% {
			opacity: 0;
			scale: 0.8;
		}
		50% {
			opacity: 1;
			scale: 1;
		}
		100% {
			scale: 0.8;
			opacity: 0;
		}
	}

	.indicators {
		position: fixed;
		left: 20px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 20px;
		a {
			display: block;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: #000;
			opacity: 0.1;
			animation: indicator linear;
			animation-timeline: --scroller;
			animation-range: calc((var(--i) - 1) * 25%) calc(var(--i) * 25% + 1px);
		}
	}

	@keyframes indicator {
		0%,
		100% {
			opacity: 1;
		}
	}
</style>
