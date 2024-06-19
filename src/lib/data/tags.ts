import { get_all_posts } from './posts';

export function get_all_post_by_tag(tag: string) {
	const posts = get_all_posts();
	return posts.filter((post) => post.tags.includes(tag));
}
