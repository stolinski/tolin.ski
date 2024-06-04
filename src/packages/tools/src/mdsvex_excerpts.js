import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

function remove_html_elements(data) {
	let script_index = -1;
	let excerpt_index = -1;
	let yaml_index = -1;

	// Find the indices of the <script />, <!-- excerpt -->, and type: 'yaml'
	data.forEach((item, index) => {
		if (item.type === 'html' && item.value.startsWith('<script>')) {
			script_index = index;
		}
		if (item.type === 'html' && item.value === '<!-- excerpt -->') {
			excerpt_index = index;
		}
		if (item.type === 'yaml') {
			yaml_index = index;
		}
	});

	// Determine the start index (script or yaml) and end index (excerpt)
	let start_index = script_index !== -1 ? script_index : yaml_index;
	let end_index = excerpt_index !== -1 ? excerpt_index : data.length;
	if (start_index !== -1 && end_index !== -1 && start_index < end_index) {
		// Filter out HTML elements between start and end index
		return data.filter((item, index) => {
			if (index <= start_index || index >= end_index) {
				return true;
			}
			return false;
		});
	}

	return data; // Return the original array if conditions are not met
}

/**
 * Just takes the excerpt string and makes it an html string
 * @param {string} markdown
 * @returns string
 */
const markdown_to_html = async (markdown) => {
	const file = await unified().use(remarkParse).use(remarkHtml).process(markdown);

	return String(file);
};

/**
 * Extracts excerpt html from markdown string
 * @param {string} markdown
 * @returns {string}
 */
const extract = (markdown) => {
	const frontmatterEnd = markdown.indexOf('---', 3) + 3; // Finding the end of the frontmatter section
	const withoutFrontmatter = markdown.slice(frontmatterEnd).trim();
	const excerptIndex = withoutFrontmatter.indexOf('<!-- excerpt -->');

	if (excerptIndex !== -1) {
		return withoutFrontmatter.slice(0, excerptIndex).trim();
	}

	return withoutFrontmatter.trim();
};

export function dropInExcerpt() {
	return async function transform(tree, file) {
		let new_tree = tree.children;
		if (file.contents.includes('<!-- excerpt -->')) {
			const pre_excerpt = extract(file.contents);
			const html = await markdown_to_html(pre_excerpt);
			if (file.data.fm) {
				// Modify the frontmatter data directly
				file.data.fm.excerpt = html;
			} else {
				// If frontmatter data doesn't exist, create a new object
				file.data.fm = {
					excerpt: html,
				};
			}
			new_tree = remove_html_elements(tree.children);
		}
		tree.children = new_tree;
		return tree;
	};
}
