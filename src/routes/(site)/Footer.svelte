<script lang="ts">
	import { settings } from '$/settings';
	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="layout-readable center">
		<div class="footer-inner">
			<div class="footer-brand" aria-label="Brand">
				<a class="brand-link" href="/" aria-label={`${settings.app_name} home`}>
					<span class="brand-name">{settings.app_name}</span>
					<span class="brand-desc">Notes, demos, talks, and projects.</span>
				</a>
			</div>

			<nav class="footer-nav" aria-label="Footer">
				<div class="footer-grid">
					<section class="footer-col" aria-labelledby="footer-site">
						<h2 id="footer-site" class="h6 footer-heading">Site</h2>
						<ul class="no-list">
							<li><a href="/">Home</a></li>
							<li><a href="/demos">Demos</a></li>
						</ul>
					</section>

					<section class="footer-col" aria-labelledby="footer-categories">
						<h2 id="footer-categories" class="h6 footer-heading">Categories</h2>
						<ul class="no-list">
							<li><a href="/posts">Posts</a></li>
							<li><a href="/talks">Talks</a></li>
							<li><a href="/projects">Projects</a></li>
							<li><a href="/cool-treats">Cool Treats</a></li>
							<li><a href="/guest-spots">Guest Spots</a></li>
						</ul>
					</section>

					<section class="footer-col" aria-labelledby="footer-elsewhere">
						<h2 id="footer-elsewhere" class="h6 footer-heading">Elsewhere</h2>
						<ul class="no-list">
							<li>
								<a href="https://syntax.fm" rel="noreferrer noopener" target="_blank">Syntax</a>
							</li>
							<li>
								<a
									href="https://github.com/stolinski"
									rel="noreferrer noopener"
									target="_blank"
								>
									GitHub
								</a>
							</li>
						</ul>
					</section>
				</div>
			</nav>
		</div>

		<div class="footer-meta">
			<p class="copyright">&copy; {year} {settings.app_name}</p>
			<a class="back-to-top" href="#main">Back to top</a>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		padding-block: clamp(var(--vs-l), 8vw, var(--vs-xl));
		padding-inline: var(--pad-l);
		margin-block-start: var(--vs-xl);
		background:
			radial-gradient(
				1200px 600px at 12% 0%,
				color-mix(in oklab, var(--yellow-5), transparent 92%),
				transparent 60%
			),
			radial-gradient(
				900px 520px at 85% -10%,
				color-mix(in oklab, var(--fg), transparent 97%),
				transparent 55%
			),
			repeating-linear-gradient(
				135deg,
				color-mix(in oklab, var(--fg), transparent 97%) 0 1px,
				transparent 1px 10px
			),
			var(--tint-or-shade);
		border-block-start: 1px solid color-mix(in oklab, var(--fg), transparent 84%);
	}

	.footer-inner {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(var(--pad-l), 5vw, 4rem);
		padding-block-end: var(--pad-l);
	}

	.footer-brand {
		min-width: 0;
	}

	.brand-link {
		display: inline-grid;
		gap: 0.35rem;
		text-decoration: none;
		padding: 0.25rem 0.4rem;
		margin-inline-start: -0.4rem;
		border-radius: var(--br-m);
	}

	.brand-name {
		font-family: 'wake', sans-serif;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		line-height: 1;
	}

	.brand-desc {
		opacity: 0.82;
		line-height: 1.35;
		max-width: 42ch;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(var(--pad-l), 4vw, 3rem);
	}

	.footer-col {
		min-width: 0;
	}

	.footer-heading {
		margin: 0 0 var(--pad-s);
		letter-spacing: 0.06em;
		opacity: 0.9;
	}

	.no-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.4rem;
	}

	.footer-nav a,
	.back-to-top {
		display: inline-block;
		color: inherit;
		text-decoration: none;
		padding: 0.18rem 0.35rem;
		margin-inline-start: -0.35rem;
		border-radius: var(--br-s);
		transition:
			color 140ms ease,
			background-color 140ms ease,
			text-decoration-color 140ms ease;
	}

	.footer-nav a:hover,
	.back-to-top:hover {
		color: var(--yellow-5);
		background: color-mix(in oklab, var(--yellow-5), transparent 92%);
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 0.18em;
		text-decoration-color: color-mix(in oklab, var(--yellow-5), transparent 10%);
	}

	.footer-nav a:focus-visible,
	.back-to-top:focus-visible {
		outline: 2px solid color-mix(in oklab, var(--yellow-5), transparent 15%);
		outline-offset: 3px;
		background: color-mix(in oklab, var(--yellow-5), transparent 88%);
	}

	.brand-link:hover {
		text-decoration: none;
	}

	.footer-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--pad-s);
		margin-block-start: var(--pad-l);
		padding-block-start: var(--pad-m);
		border-block-start: 1px solid color-mix(in oklab, var(--fg), transparent 88%);
	}

	.copyright {
		margin: 0;
		opacity: 0.82;
		line-height: 1.4;
	}

	.back-to-top {
		font-size: 0.95em;
		opacity: 0.92;
	}

	.back-to-top:hover {
		opacity: 1;
	}

	@media (min-width: 48rem) {
		.footer-inner {
			grid-template-columns: minmax(16rem, 0.9fr) 1.6fr;
			align-items: start;
		}

		.footer-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: clamp(var(--pad-l), 5vw, 4rem);
		}
	}
</style>
