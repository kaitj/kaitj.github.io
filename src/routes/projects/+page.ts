import type { PageLoad } from './$types';
import raw from '$lib/data/projects.json';

interface Project {
	name: string;
	description: string;
	repo: string;
	website?: string | null;
	tools: string[];
}

// JSON entries have inconsistent `website` keys; TS would infer a union of shapes otherwise
const projects: Project[] = raw;

// Vite types `query: '?url'` + `eager: true` as Record<string, string> — no cast needed
const images = Object.fromEntries(
	Object.entries(
		import.meta.glob('/src/lib/assets/images/projects/*.svg', {
			eager: true,
			query: '?url',
			import: 'default'
		})
	).map(([path, url]) => [path.split('/').pop()!.replace(/\.svg$/, ''), url])
);

export const load: PageLoad = () => ({
	projects: projects.map((p) => ({
		...p,
		image: images[p.name.toLowerCase()] ?? null,
		tools: p.tools.toSorted((a, b) => a.localeCompare(b))
	}))
});
