import type { PageLoad } from './$types';
import publications from '$lib/data/publications.json';

export const load: PageLoad = () => {
	const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
	return {
		groups: years.map((year) => ({ year, pubs: publications.filter((p) => p.year === year) }))
	};
};
