import { desluggify } from '@drop-in/tools';
import { get_all_posts, get_all_posts_in_category } from '$/lib/data/posts';

export const load = async function ({ params }) {
	const category = await import(`$/categories/${params.category}.md`);

	const name = desluggify(params.category);

	return {
		title: name,
		category: name,
		content: category.default,
		posts: get_all_posts_in_category(params.category),
	};
};
