import { get_all_categories } from '$/lib/data/categories';
import { get_all_posts, get_all_tags_from_posts } from '$/lib/data/posts';

export const load = async function () {
	const posts = get_all_posts();
	return {
		posts,
		categories: get_all_categories(),
		tags: get_all_tags_from_posts(posts),
	};
};
