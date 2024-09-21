import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const load = async function ({ params }) {
	let file_name = params.file_name.replaceAll('-', '_');
	let demo_name = params.old_name;
	redirect(308, `/demos/${file_name}-${demo_name}`);
};
