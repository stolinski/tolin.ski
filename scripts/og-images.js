// Renders a 1200x630 Open Graph card for every prerendered page, using the
// page's own og:title. Runs after `vite build` against the adapter output.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import opentype from 'opentype.js';

const OUTPUT_DIR = process.argv[2] ?? '.svelte-kit/cloudflare';
const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 80;
// The site's dark-mode --bg and --fg.
const BG = '#050505';
const FG = '#ddd';
const NAME = 'Scott Tolinski';
const NAME_SIZE = 30;
const TITLE_MAX_SIZE = 150;
const TITLE_MIN_SIZE = 56;
const TITLE_LINE_HEIGHT = 1.05;

const wake = opentype.parse((await readFile('static/newake.otf')).buffer);
// Wake has no punctuation, so browsers fall back to sans-serif (Helvetica Bold)
// for those glyphs. Arimo shares Helvetica's metrics.
const fallback = opentype.parse((await readFile('scripts/fonts/Arimo-Bold.ttf')).buffer);

/** @typedef {{ text: string, font: opentype.Font }} Run */

/** Split text into runs of the font that has each glyph. @param {string} text @returns {Run[]} */
function runs(text) {
	/** @type {Run[]} */
	const result = [];
	for (const char of text) {
		const font = /\s/.test(char) || wake.charToGlyphIndex(char) !== 0 ? wake : fallback;
		const last = result.at(-1);
		if (last?.font === font) last.text += char;
		else result.push({ text: char, font });
	}
	return result;
}

/** opentype.js's own serializer can emit NaN, so build the path data here. @param {opentype.Path} path */
function path_data(path) {
	/** @param {number} n */
	const f = (n) => Math.round(n * 100) / 100;
	return path.commands
		.map((c) => {
			if (c.type === 'M' || c.type === 'L') return `${c.type}${f(c.x)} ${f(c.y)}`;
			if (c.type === 'C') return `C${f(c.x1)} ${f(c.y1)} ${f(c.x2)} ${f(c.y2)} ${f(c.x)} ${f(c.y)}`;
			if (c.type === 'Q') return `Q${f(c.x1)} ${f(c.y1)} ${f(c.x)} ${f(c.y)}`;
			return 'Z';
		})
		.join('');
}

/** Lay out a line as runs, returning path data per font. @param {string} text @param {number} x @param {number} y @param {number} size */
function line_paths(text, x, y, size) {
	let wake_d = '';
	let fallback_d = '';
	for (const run of runs(text)) {
		const d = path_data(run.font.getPath(run.text, x, y, size, { kerning: true }));
		if (run.font === wake) wake_d += d;
		else fallback_d += d;
		x += run.font.getAdvanceWidth(run.text, size, { kerning: true });
	}
	return { wake_d, fallback_d };
}

/** @param {string} dir @returns {Promise<string[]>} */
async function find_html(dir) {
	const entries = await readdir(dir, { withFileTypes: true, recursive: true });
	return entries
		.filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
		.map((entry) => join(entry.parentPath, entry.name));
}

/** @param {string} value */
function decode_entities(value) {
	return value
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

/** @param {string} text @param {number} size */
function measure(text, size) {
	return runs(text).reduce(
		(width, run) => width + run.font.getAdvanceWidth(run.text, size, { kerning: true }),
		0,
	);
}

/** Greedy word wrap. @param {string} text @param {number} size @param {number} max_width */
function wrap(text, size, max_width) {
	/** @type {string[]} */
	const lines = [];
	for (const word of text.split(/\s+/)) {
		const last = lines.at(-1);
		if (last !== undefined && measure(`${last} ${word}`, size) <= max_width) {
			lines[lines.length - 1] = `${last} ${word}`;
		} else {
			lines.push(word);
		}
	}
	return lines;
}

/** Largest size where the title fits the available box. @param {string} text */
function fit_title(text) {
	const max_width = WIDTH - PAD * 2;
	const max_height = HEIGHT - PAD * 3 - NAME_SIZE;
	for (let size = TITLE_MAX_SIZE; size > TITLE_MIN_SIZE; size -= 2) {
		const lines = wrap(text, size, max_width);
		const fits_width = lines.every((line) => measure(line, size) <= max_width);
		if (fits_width && lines.length * size * TITLE_LINE_HEIGHT <= max_height) return { size, lines };
	}
	return { size: TITLE_MIN_SIZE, lines: wrap(text, TITLE_MIN_SIZE, max_width) };
}

/** @param {string} title */
function render_card(title) {
	const { size, lines } = fit_title(title.toUpperCase());
	const line_height = size * TITLE_LINE_HEIGHT;
	// Bottom-align the block; cap height keeps the last baseline on the padding edge.
	const last_baseline = HEIGHT - PAD;
	let title_wake = '';
	let title_fallback = '';
	lines.forEach((line, i) => {
		const y = last_baseline - (lines.length - 1 - i) * line_height;
		const { wake_d, fallback_d } = line_paths(line, PAD, y, size);
		title_wake += wake_d;
		title_fallback += fallback_d;
	});

	const name_x = (WIDTH - measure(NAME, NAME_SIZE)) / 2;
	const name = line_paths(NAME, name_x, PAD / 2 + NAME_SIZE * 0.7, NAME_SIZE);

	// The site sets headings at weight 900 on a single-weight font, so browsers
	// synthesize bold by stroking the outline at 1/32 of the font size.
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
	<rect width="100%" height="100%" fill="${BG}"/>
	${title === NAME ? '' : `<path d="${name.wake_d}${name.fallback_d}" fill="${FG}"/>`}
	<path d="${title_wake}" fill="${FG}" stroke="${FG}" stroke-width="${size / 32}"/>
	<path d="${title_fallback}" fill="${FG}"/>
</svg>`;

	return new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}

/** @param {string} html_path */
function og_path_for(html_path) {
	const route = relative(OUTPUT_DIR, html_path).replace(/(\/index)?\.html$/, '');
	return join(OUTPUT_DIR, 'og', `${route || 'index'}.png`);
}

let count = 0;
for (const html_path of await find_html(OUTPUT_DIR)) {
	const html = await readFile(html_path, 'utf8');
	const match = html.match(/<meta property="og:title" content="([^"]*)"/);
	if (!match) continue;
	const out = og_path_for(html_path);
	await mkdir(dirname(out), { recursive: true });
	await writeFile(out, render_card(decode_entities(match[1])));
	count++;
}

// The worker only serves assets it saw at build time, so route /og/* straight to
// static assets. Pages caps rules at 100; the adapter already fills that, so the
// last exclude gives up its slot (that path still works through the worker).
const ROUTES_PATH = join(OUTPUT_DIR, '_routes.json');
const ROUTES_LIMIT = 100;
const routes = JSON.parse(await readFile(ROUTES_PATH, 'utf8'));
if (!routes.exclude.includes('/og/*')) {
	routes.exclude.unshift('/og/*');
	while (routes.include.length + routes.exclude.length > ROUTES_LIMIT) routes.exclude.pop();
	await writeFile(ROUTES_PATH, JSON.stringify(routes, null, '\t'));
}

console.log(`og-images: wrote ${count} cards to ${join(OUTPUT_DIR, 'og')}`);
