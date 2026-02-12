<script lang="ts">

	import { settings } from '$settings';
</script>

<header>
	<div>
		<p><a href="/">{settings.app_name}</a></p>
	</div>
</header>

<style>
    header {
        padding: var(--vs-s) var(--vs-m);
        text-align: center;
        p {
            margin: 0;
            font-family: 'wake';
        }
        a {
            text-decoration: none;
            &:hover {
                color: var(--yellow-5);
            }
        }
    }
</style>
