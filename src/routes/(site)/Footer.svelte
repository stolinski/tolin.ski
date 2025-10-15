<script lang="ts">
	import { settings } from '$/settings';
</script>

<footer>
	<p>&copy; {new Date().getFullYear()} {settings.app_name}</p>
	<ul class="no-list">
		<li><a href="/">Home</a></li>
	</ul>
</footer>

<style>
    footer {
        padding: var(--pad-l);
        ul {
            a {
                text-decoration: none;
            }
        }
    }
</style>
