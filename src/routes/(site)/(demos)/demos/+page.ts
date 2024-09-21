export const load = async function () {
	const demos = get_all_demos();
	return {
		demos,
	};
};

function get_all_demos() {
	let demos = {};

	const paths = import.meta.glob(`$/demo/**/*`, {
		eager: true,
	});
	demos = transformPaths(paths);
	return demos;
}

function transformPaths(paths: Record<string, any>) {
	const result = {};

	for (const [path, module] of Object.entries(paths)) {
		const fileName = path.split('/').pop()?.split('.')[0];
		const [componentName, type] = fileName?.split('-') ?? [];

		if (!result[componentName]) {
			result[componentName] = [];
		}

		result[componentName].push({
			name: type,
			path: fileName,
		});
	}

	return result;
}
