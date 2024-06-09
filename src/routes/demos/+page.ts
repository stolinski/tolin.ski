export const load = async function ({ fetch, params }) {
	const demos = get_all_demos(params.parent);
	console.log('demos', demos);

	return {
		demos,
	};
};

function get_all_demos(parent: string) {
	let demos = {};

	const paths = import.meta.glob(`$/demos/**/*.demo`, {
		eager: true,
	});

	for (const path in paths) {
		const file = paths[path];
		console.log('file', file);
		const slug = path.split('/').at(-1)?.replace('.demo', '');
		const parent = path.split('/').at(-2);
		console.log('slug', slug);
		demos[parent] = [...(demos?.[parent] || []), slug];
	}
	return demos;
}
