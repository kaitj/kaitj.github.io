<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import { onMount } from 'svelte';

	interface Project {
		name: string;
		image: string;
		description: string;
		website: string;
		repo: string;
		tools: string[];
	}

	let projects: Project[] = [];
	const URL_JSON_PROJECTS = 'projects.json';

	let loading = true; // Flag to track loading state
	onMount(async () => {
		try {
			const response = await fetch(URL_JSON_PROJECTS);
			const data = await response.json();

			projects = data;
			projects.forEach((project) => {
				project.tools = project.tools.sort((a, b) => a.localeCompare(b));
			});
		} catch (error) {
			console.error('Error loading projects:', error);
		} finally {
			console.log('Finished loading projects');
			loading = false;
		}
	});
</script>

{#if loading}
	<Loader />
{:else}
	<div class="container mx-auto my-8 flex h-full items-center justify-center">
		<div class="space-y-4 px-4">
			<div>
				<h1 class="h1">Projects</h1>
				<p class="mt-4">
					Below are some projects I have been involved in - for a complete list, check out my <a
						href="https://github.com/kaitj"
						target="_blank"
						class="underline">Github</a
					>.
				</p>
			</div>
			<section class="grid grid-cols-2 gap-4 lg:grid-cols-3">
				{#each projects as project}
					<div
						class="card preset-filled-surface-100-900 border-surface-200-800 block max-w-md overflow-hidden border-[1px]"
					>
						<!-- Card image -->
						<header>
							<div class="aspect-[21/9] w-full">
								{#if project.image}
									<img src={project.image} alt="" class="object-fit h-full w-full" />
								{:else}
									<div class="h-full w-full bg-inherit"></div>
								{/if}
							</div>
						</header>
						<hr/>
						<!-- Card contents -->
						<article>
							<div class="px-4">
								<h3 class="h3 mt-4">{project.name}</h3>
								<div class="my-2">
									<span class="space-x-4">
										{#if project.repo}
											<a href={project.repo} target="_blank" class="underline">Repository</a>
										{/if}
										{#if project.website}
											<a href={project.website} target="_blank" class="underline">Website</a>
										{/if}
									</span>
								</div>
								<br/>
								<p class="mt-2">{project.description}</p>
							</div>
						</article>
						<br/>
						<!-- Card tools -->
						<footer>
							<div class="mt-2 min-h-10">
								<div class="flex flex-wrap gap-2 px-4 pb-2">
									{#each project.tools as tool}
										<span class="chip preset-filled-primary-500">{tool}</span>
									{/each}
								</div>
							</div>
						</footer>
					</div>
				{/each}
			</section>
		</div>
	</div>
{/if}
