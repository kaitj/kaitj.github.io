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

	let pubs: Publication[] = [];
	let pubYears: number[] = [];
	let pubYearsAsc: number[] = [];
	let loading = true;

	onMount(async () => {
		try {
			const response: Response = await fetch('publications.json');
			const data: Publication[] = await response.json();
			pubs = data;
			pubYears = [...new Set(data.map((p) => p.year))].sort((a, b) => b - a);
			pubYearsAsc = [...pubYears].reverse();
		} catch (error: unknown) {
			console.error('Error loading publications:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<Loader />
{:else}
	<div>
		<div class="container mx-auto mt-8 mb-4 max-w-3xl px-4">
			<h1 class="text-3xl font-bold md:text-4xl">Publications</h1>
		</div>

		<div
			class="border-border bg-background/90 sticky z-10 border-b backdrop-blur-sm"
			style="top: var(--navbar-height, 4.5rem)"
		>
			<div class="container mx-auto max-w-3xl px-4 py-2">
				<div class="flex flex-wrap gap-2">
					{#each pubYearsAsc as year}
						<a
							href="#pub-{year}"
							class="border-border text-muted-foreground hover:bg-accent hover:text-foreground rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
						>
							{year}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<div class="container mx-auto mb-8 max-w-3xl px-4">
			<div class="relative mt-6 pl-6 md:mt-10 md:pl-8">
				<div class="bg-border absolute top-0 left-3 h-full w-px"></div>

				{#each pubYears as year}
					<section id="pub-{year}" class="scroll-mt-36 md:scroll-mt-44">
						<div class="relative mb-6 flex items-center">
							<div
								class="bg-primary ring-background absolute left-3 z-9 size-3 -translate-x-1/2 rounded-full ring-4"
							></div>
							<span class="ml-6 text-xl font-bold md:ml-8 md:text-2xl">{year}</span>
						</div>

						{#each pubs.filter((pub) => pub.year === year) as pub}
							<div class="relative mb-10">
								<div
									class="border-border bg-background absolute top-2 left-3 size-2 -translate-x-1/2 rounded-full border-2"
								></div>
								<div class="ml-6 md:ml-8">
									<p class="text-lg leading-snug font-semibold">{pub.title}</p>
									<p class="text-muted-foreground mt-1 text-base">
										{pub.authors.join(', ')}. <em>{pub.journal}</em>.
									</p>
									<p class="text-muted-foreground mt-1 text-sm">
										doi: <a
											href={`https://doi.org/${pub.doi}`}
											target="_blank"
											class="hover:text-foreground underline transition-colors">{pub.doi}</a
										>
									</p>
								</div>
							</div>
						{/each}
					</section>
				{/each}
			</div>
		</div>
	</div>
{/if}
