import { visit } from 'unist-util-visit';

export default function remarkDoubleDoller() {
	return (tree, file) => {
		const imports = new Set();
		let hasComponent = false;

		// First pass: collect all necessary imports
		visit(tree, 'text', (node) => {
			const matches = node.value.match(/\$\$\s*(\S+)/g);
			if (matches) {
				imports.add(`import Iframe from '$lib/Iframe.svelte';`);
				hasComponent = true;
			}
		});

		// Second pass: replace $$ patterns and update or add script tag
		visit(tree, (node) => {
			if (node.type === 'html' && node.value.trim().startsWith('<script')) {
				// If a script tag exists, add imports to it
				const importString = Array.from(imports).join('\n');
				node.value = node.value.replace('<script>', `<script>\n${importString}\n`);
				return;
			}
		});

		// If no script tag was found and we have imports, add a new script tag
		if (
			hasComponent &&
			!tree.children.some((node) => node.type === 'html' && node.value.trim().startsWith('<script'))
		) {
			const importString = Array.from(imports).join('\n');
			tree.children.unshift({
				type: 'html',
				value: `<script>\n${importString}\n</script>`,
			});
		}

		// Third pass: replace $$ patterns with Iframe components
		visit(tree, 'text', (node, index, parent) => {
			const matches = node.value.match(/\$\$\s*(\S+)/g);
			if (!matches) return;

			const newNodes = [];
			let lastIndex = 0;

			matches.forEach((match) => {
				const [fullMatch, componentName] = match.match(/\$\$\s*(\S+)/);
				const startIndex = node.value.indexOf(fullMatch, lastIndex);

				if (startIndex > lastIndex) {
					newNodes.push({ type: 'text', value: node.value.slice(lastIndex, startIndex) });
				}

				newNodes.push({
					type: 'html',
					value: `<Iframe path="${componentName}" />`,
				});

				lastIndex = startIndex + fullMatch.length;
			});

			if (lastIndex < node.value.length) {
				newNodes.push({ type: 'text', value: node.value.slice(lastIndex) });
			}

			parent.children.splice(index, 1, ...newNodes);
		});
	};
}
