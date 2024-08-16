export const load = async function ({ parent }) {
	const { posts } = await parent();
	return { posts };
};
