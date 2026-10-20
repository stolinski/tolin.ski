import { desluggify } from '@drop-in/tools';

export const load = async function ({ params }) {
	const [component, variant] = params.file_name.split('-');
	return {
		title: `${desluggify(component.replaceAll('_', '-'))} ${variant ?? ''}`.trim(),
		file_name: params.file_name,
	};
};
