<script lang="ts">
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
	const URL_JSON_PUBS = 'publications.json';

	let pubLoading = true; // Flag to track publication loading state
	onMount(async () => {
		try {
			const response = await fetch(URL_JSON_PUBS);
			const data = await response.json();

			// Set pubs and pubYears after fetching data
			pubs = data;
			pubYears = Array.from(new Set(data.map((pub) => pub.year))).sort((a, b) => b - a);
		} catch (error) {
			console.error('Error loading publications:', error);
		} finally {
			console.log('Finished loading publications.');
			pubLoading = false;
		}
	});
</script>

{#if pubLoading}
	<div class="flex justify-center items-center mt-8">
		<div class="placeholder-circle w-12 variant-soft-primary animate-pulse" />
	</div>
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
