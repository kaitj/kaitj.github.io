<script lang="ts">
	import Loader from '$lib/components/Loader.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { findImageByProjectName, loadAllProjectImages } from '$lib/utils/imageImports';
	import { ExternalLink, Globe } from '@lucide/svelte';
	import { onMount } from 'svelte';

	interface Project {
		name: string;
		description: string;
		website: string;
		repo: string;
		tools: string[];
	}

	interface ProjectWithImage extends Project {
		imageUrl: string | null;
	}

	let projects: ProjectWithImage[] = [];
	let loading = true;

	onMount(async () => {
		try {
			const [imageMap, response] = await Promise.all([
				loadAllProjectImages(),
				fetch('projects.json')
			]);
			const projectData: Project[] = await response.json();
			projects = projectData.map((project) => ({
				...project,
				imageUrl: findImageByProjectName(imageMap, project.name),
				tools: project.tools.sort((a, b) => a.localeCompare(b))
			}));
		} catch (error) {
			console.error('Error loading projects:', error);
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<Loader />
{:else}
	<div class="container mx-auto w-full max-w-5xl px-4 py-8">
		<div class="mb-8">
			<h1 class="text-3xl font-bold md:text-4xl">Projects</h1>
			<p class="text-muted-foreground mt-2 text-base md:text-lg">
				A selection of projects I've contributed to. For a complete list, visit my <a
					href="https://github.com/kaitj"
					target="_blank"
					rel="noreferrer"
					class="text-foreground hover:text-primary font-medium underline underline-offset-4"
					>GitHub</a
				>.
			</p>
		</div>

		<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<Card.Root class="pt-0 transition-shadow duration-200 hover:shadow-lg">
					<div class="bg-muted/50 aspect-[16/9] w-full overflow-hidden">
						{#if project.imageUrl}
							<img src={project.imageUrl} alt="" class="h-full w-full object-contain p-4" />
						{:else}
							<div class="flex h-full w-full items-center justify-center">
								<span class="text-muted-foreground/20 text-6xl font-bold select-none">
									{project.name[0]}
								</span>
							</div>
						{/if}
					</div>

					<Card.Header class="gap-1 pb-2">
						<Card.Title class="text-lg">{project.name}</Card.Title>
						<div class="flex items-center gap-3">
							{#if project.repo}
								<a
									href={project.repo}
									target="_blank"
									rel="noreferrer"
									class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
								>
									<ExternalLink class="size-3.5" />
									Repository
								</a>
							{/if}
							{#if project.website}
								<a
									href={project.website}
									target="_blank"
									rel="noreferrer"
									class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
								>
									<Globe class="size-3.5" />
									Website
								</a>
							{/if}
						</div>
					</Card.Header>

					<Card.Content>
						<p class="text-muted-foreground text-base leading-relaxed">{project.description}</p>
					</Card.Content>

					<Card.Footer class="flex-wrap gap-2">
						{#each project.tools as tool}
							<Badge variant="secondary">{tool}</Badge>
						{/each}
					</Card.Footer>
				</Card.Root>
			{/each}
		</section>
	</div>
{/if}
