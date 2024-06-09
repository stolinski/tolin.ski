export const load = async function ({ params }) {
	const demos = get_all_demos(params.parent);
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
		const slug = path.split('/').at(-1)?.replace('.demo', '');
		const parent = path.split('/').at(-2);
		demos[parent] = [...(demos?.[parent] || []), slug];
	}
	return demos;
}
