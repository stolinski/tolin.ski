import { desluggify } from '@drop-in/tools';
import { get_all_post_by_tag } from '$/lib/data/tags';

export const load = async function ({ params }) {
	const posts = get_all_post_by_tag(params.tag);
	const tag = desluggify(params.tag);
	return {
		title: tag,
		tag,
		posts,
	};
};
