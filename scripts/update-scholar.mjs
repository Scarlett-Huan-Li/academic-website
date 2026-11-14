// Refreshes src/data/scholar.json from the public Google Scholar profile.
// Runs automatically before every build ("prebuild" in package.json).
// Google Scholar has no API and sometimes refuses automated requests, so any
// failure is non-fatal: the numbers already stored in the file are kept.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USER_ID = 'FTIcDIYAAAAJ';
const file = fileURLToPath(new URL('../src/data/scholar.json', import.meta.url));

try {
	const current = JSON.parse(await readFile(file, 'utf8'));
	const res = await fetch(`https://scholar.google.com/citations?user=${USER_ID}&hl=en`, {
		headers: { 'User-Agent': 'Mozilla/5.0 (compatible; site-build)' },
		signal: AbortSignal.timeout(15000),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const html = await res.text();
	// The "Cited by" table holds six cells: citations, h-index, i10-index, each as (all, recent).
	const cells = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map((m) => Number(m[1]));
	if (cells.length < 6) throw new Error('metrics table not found (request probably blocked)');
	const next = { citations: cells[0], hIndex: cells[2], i10Index: cells[4] };
	// Citation counts only go up; a much smaller number means the page was not what we expected.
	if (next.citations < current.citations * 0.9 || next.hIndex < 1) throw new Error('implausible values');
	if (next.citations === current.citations && next.hIndex === current.hIndex && next.i10Index === current.i10Index) {
		console.log('[scholar] unchanged');
	} else {
		const updated = new Date().toISOString().slice(0, 10);
		await writeFile(file, JSON.stringify({ ...next, updated }, null, 2) + '\n');
		console.log(`[scholar] updated: ${next.citations} citations, h-index ${next.hIndex}, i10-index ${next.i10Index}`);
	}
} catch (err) {
	console.warn(`[scholar] keeping stored numbers (${err.message})`);
}
