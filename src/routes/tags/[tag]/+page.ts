import { desluggify } from '@drop-in/tools';
import { get_all_categories } from '$/lib/data/categories';
import { get_all_posts, get_all_tags_from_posts } from '$/lib/data/posts';
import { get_all_post_by_tag } from '$/lib/data/tags';

export const load = async function ({ params }) {
	const all_posts = get_all_posts();
	const posts = get_all_post_by_tag(params.tag);
	return {
		tag: desluggify(params.tag),
		posts,
		categories: get_all_categories(),
		tags: get_all_tags_from_posts(all_posts), //TODO move to parent layout
	};
};
