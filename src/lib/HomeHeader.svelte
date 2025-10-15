<script lang="ts">
	import { settings } from '$settings';
</script>

<header>
	<div class="links">
		<div class="flex">
			<a href="https://syntax.fm">The Syntax Podcast</a>
			<a href="https://github.com/stolinski">GitHub</a>
		</div>
	</div>
	<section class="hero">
		<h1 style:--transition-name="scott-tolinski">{settings.app_name}</h1>
	</section>
</header>

<style>
    .links {
        background: var(--tint-or-shade);
        padding: var(--vs-s) var(--vs-m);
        a {
            text-decoration: none;
            &:hover {
                color: var(--yellow-5);
            }
        }
    }

    .hero {
        text-align: center;
        h1 {
            --fl: 6;
            padding: var(--vs-xl);
        }
    }

</style>
