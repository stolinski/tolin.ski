export const load = async function ({ params }) {
	const post = await import(`$/demos/${params.parent}/${params.file_name}.demo`);

	return {
		content: post.default,
	};
};
