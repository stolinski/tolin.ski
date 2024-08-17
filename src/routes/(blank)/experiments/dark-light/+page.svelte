<script lang="ts">
	import './reset.css';
	import './styles.css';

	function swapBodyClass(newMode: string, prefix = 'mode-') {
		const body = document.body;
		const classes = body.className.split(' ');

		// Remove any existing classes with the specified prefix
		const filteredClasses = classes.filter((cls) => !cls.startsWith(prefix));

		// Add the new class with the prefix
		filteredClasses.push(`${prefix}${newMode}`);

		// Set the new class list on the body
		body.className = filteredClasses.join(' ');
	}

	function change_mode(mode: string) {
		console.log('mode', mode);
		swapBodyClass(mode);
	}

	function change_theme(theme: string) {
		console.log('theme', theme);
		swapBodyClass(theme, 'theme-');
	}
</script>

<section>
	<p>
		This is some generic placeholder text. Stuff we used to use lorem ipsum for, or maybe wutang
		ipsum.
	</p>

	<form method="post">
		<label for="question">Ask a question: <input id="question" name="question" /></label>
		<button type="submit">Submit</button>
	</form>
</section>

<section class="dark">
	<h2>Always Dark Zone</h2>
	<p>This zone will always be dark.</p>
	<button>Even the button</button>
</section>

<section class="light">
	<h2>Always Light Zone</h2>
	<p>This zone will always be light.</p>
	<button>Even the button</button>
</section>

<section class="inverted">
	<h2>Always Inverted Zone</h2>
	<p>This zone will always be inverted.</p>
	<button>Even the button</button>
</section>

<section>
	<h2>Mode Picker</h2>
	<button onclick={() => change_mode('system')}>System</button>
	<button onclick={() => change_mode('light')}>Light</button>
	<button onclick={() => change_mode('dark')}>Dark</button>
</section>

<section>
	<h2>Theme Picker</h2>
	<button onclick={() => change_theme('base')}>Base</button>
	<button onclick={() => change_theme('blue')}>Blue</button>
	<button onclick={() => change_theme('mono')}>Mono</button>
	<button onclick={() => change_theme('santa')}>Santa</button>
</section>

<style>
	section {
		box-shadow: 1px 1px 10px light-dark(black, transparent);
		border: 1px solid light-dark(transparent, white);
	}
</style>
