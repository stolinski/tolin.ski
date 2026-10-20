export const load = async function ({ params }) {
	const post = await import(`$/posts/${params.slug}.md`);

	return {
		title: post.metadata.title,
		meta: { ...post.metadata, slug: params.slug },
		content: post.default,
	};
};
