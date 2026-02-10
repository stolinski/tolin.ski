interface DemoItem {
	name: string;
	path: string | undefined;
}

type DemoMap = Record<string, DemoItem[]>;

export const load = async function () {
	const demos = get_all_demos();
	return {
		demos,
	};
};

function get_all_demos(): DemoMap {
	const paths = import.meta.glob(`$/demo/**/*`, {
		eager: true,
	});
	return transformPaths(paths);
}

function transformPaths(paths: Record<string, unknown>): DemoMap {
	const result: DemoMap = {};

	for (const [path] of Object.entries(paths)) {
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
