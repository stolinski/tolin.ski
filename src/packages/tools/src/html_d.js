/** @returns {import('svelte/types/compiler/preprocess').PreprocessorGroup} */
export function html_d() {
	return {
		name: 'html_demos',
		async markup({ content, filename }) {
			if (filename?.endsWith('.html')) {
				const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
				const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
				const script = scriptMatch ? scriptMatch[1] : '';
				const style = styleMatch ? styleMatch[1] : '';

				let body = content
					.replace(/<script>[\s\S]*?<\/script>/, '')
					.replace(/<style>[\s\S]*?<\/style>/, '')
					.trim();

				// Construct Svelte component
				const svelteComponent = `
<svelte:head>
<script>
${script}
</script>
</svelte:head>

${body}

<style>
${style}
</style>
				`.trim();
				return {
					code: svelteComponent,
				};
			}
		},
	};
}
