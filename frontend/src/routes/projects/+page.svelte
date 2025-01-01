<script lang="ts">
	import Loader from '$lib/components/Loader/Loader.svelte';
	import { onMount } from 'svelte';

	interface Project {
		name: string;
		image: string;
		description: string;
		website: string;
		github: string;
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
	<div class="container h-screen mx-auto flex justify-center items-center">
		<div class="space-y-4">
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
			<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each projects as project}
					<div class="card flex flex-col h-full bg-primary-200">
						<!-- Card image -->
						<div class="card-header h-32 w-full">
							{#if project.image !== null}
								<img src={project.image} alt="" class="object-fit h-full w-full" />
							{:else}
								<div class="h-full w-full object-cover" />
							{/if}
						</div>
						<!-- Card contents -->
						<div class="card-body relative min-h-[200px] px-4">
							<h3 class="h3 mt-4">{project.name}</h3>
							<p class="mt-2">{project.description}</p>
							<row class="space-x-1 absolute bottom-0">
								{#if project.github !== null}
									<a href={project.github} target="_blank" class="underline">Repository</a>
								{/if}
								{#if project.website !== null}
									<a href={project.website} target="_blank" class="underline">Website</a>
								{/if}
							</row>
						</div>
						<!-- Card tools -->
						<div class="card-footer mt-2 space-y-2 min-h-10">
							<hr />
							{#each project.tools as tool}
								<span class="badge variant-ghost-secondary mx-1">{tool}</span>
							{/each}
						</div>
						<div></div>
					</div>
				{/each}
			</section>
		</div>
	</div>
{/if}
