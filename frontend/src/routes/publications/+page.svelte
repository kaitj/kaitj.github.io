<script lang="ts">
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	interface Publication {
		pmid: string;
		title: string;
		authors: string[];
		year: number;
		journal: string;
		doi: string;
	}

	let pubs: Publication[] = [];
	let pubYears: number[] = [];
	const urlJsonPubs = 'publications.json';

	let loading = true; // Flag to track publication loading state
	onMount(async () => {
		try {
			const response: Response = await fetch(urlJsonPubs);
			const data: Publication[] = await response.json();

			// Set pubs and pubYears after fetching data
			pubs = data;
			pubYears = Array.from(new Set(data.map((pub: Publication) => pub.year))).sort(
				(a: number, b: number) => b - a
			);
		} catch (error: unknown) {
			console.error('Error loading publications:', error);
		} finally {
			console.log('Finished loading publications.');
			loading = false;
		}
	});
</script>

{#if loading}
	<Loader />
{:else}
	<div class="container h-full mx-auto mt-8">
		<div class="space-y-5 px-4">
			<h1 class="h1">Publications</h1>
			<div class="grid grid-cols-5 gap-4">
				<div class="col-span-4" use:tocCrawler={{ mode: 'generate' }}>
					{#each pubYears as year}
						<div class="row">
							<h2 class="text-2xl" id="pub-{year}">{year}</h2>
							<dl class="list-dl mt-2">
								{#each pubs.filter((pub) => pub.year === year) as pub}
									<div>
										<span class="badge bg-primary-500 text-lg">🖺</span>
										<span class="flex-auto">
											<dt class="text-xl"><strong>{pub.title}</strong></dt>
											<dd class="text-lg">
												{pub.authors.join(', ')}. <em>{pub.journal}</em>.
												<br />
												doi:
												<a href={`https://doi.org/${pub.doi}`} target="_blank" class="underline"
													>{pub.doi}</a
												>
											</dd>
										</span>
									</div>
								{/each}
							</dl>
						</div>
					{/each}
				</div>
				<div class="col-span-1">
					<!-- <TableOfContents/> -->
					<TableOfContents class="sticky top-10 px-24">
						<h1 class="text-xl">Year</h1>
					</TableOfContents>
				</div>
			</div>
		</div>
	</div>
{/if}
