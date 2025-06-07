<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import { onMount } from 'svelte';

	interface Publication {
		pmid: string;
		title: string;
		authors: string[];
		year: number;
		journal: string;
		doi: string;
	}

	interface PageHeadings {
		text: string;
		slug: string;
		depth: number;
	}

	let pubs: Publication[] = [];
	let pubYears: number[] = [];
	let headings: PageHeadings[] = [];

	const urlJsonPubs = 'publications.json';
	let loading = true; // Flag to track publication loading state

	function setIndentationClass(depth: number) {
		switch (depth) {
			case 6:
				return 'pl-12';
			case 5:
				return 'pl-10';
			case 4:
				return 'pl-8';
			case 3:
				return 'pl-6';
			case 2:
				return 'pl-4';
			case 1:
				return 'pl-2';
			default:
				return 'pl-0';
		}
	}

	onMount(async () => {
		try {
			const response: Response = await fetch(urlJsonPubs);
			const data: Publication[] = await response.json();

			// Set pubs and pubYears after fetching data
			pubs = data;
			pubYears = Array.from(new Set(data.map((pub: Publication) => pub.year))).sort(
				(a: number, b: number) => b - a
			);
			headings = pubYears.map((year) => ({
				text: `${year}`,
				slug: `pub-${year}`,
				depth: 1
			}));
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
	<div class="container mx-auto my-8 h-full">
		<div class="space-y-5 px-4">
			<h1 class="h1">Publications</h1>
			<div class="grid md:grid-cols-5 gap-4">
				<div class="col-span-4">
					{#each pubYears as year}
						<div class="row">
							<h2 class="mt-8 text-2xl" id="pub-{year}"><strong>{year}</strong></h2>
							<dl class="list-dl mt-2">
								{#each pubs.filter((pub) => pub.year === year) as pub}
									<div class="mt-4 flex gap-2">
										<span class="flex w-14 flex-none items-center justify-center">
											<span class="badge bg-primary-500 text-lg">🖺</span>
										</span>
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
				<!-- ToC -->
				<div class="col-span-1 hidden md:block">
					<nav class="card text-md sticky top-10 space-y-2 bg-inherit p-4 text-right">
						<div class="text-lg"><strong>Year</strong></div>
						<ul class="space-y-2">
							{#each headings as heading}
								<li>
									<a
										href={`#${heading.slug}`}
										class="anchor block"
										class:list={setIndentationClass(heading.depth)}
									>
										{heading.text}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
{/if}
