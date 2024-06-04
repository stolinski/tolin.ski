<script lang="ts">
	import { settings } from '$settings';
</script>

<header class="layout">
	<div class="content">
		<p class="logo"><a href="/">{settings.app_name}</a></p>
		<nav>
			<!-- Add your nav -->
			<ul>
				<li><a href="/">Blog</a></li>
				<li><a href="/uses">Uses</a></li>
				<!-- <li><a href="/rss.xml">Feed</a></li> -->
			</ul>
		</nav>
	</div>
</header>

<style>
	.logo {
		font-style: italic;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header {
		border-bottom: 1px solid rgb(0 0 0 / 0.5);
	}
	header a {
		color: var(--fg);
		text-decoration: none;
	}
	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 25px;
	}
	nav ul li {
		font-size: var(--fs-xs);
	}
</style>
