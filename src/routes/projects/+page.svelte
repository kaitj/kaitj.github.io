<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ExternalLink, Globe } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

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
		{#each data.projects as project}
			<Card.Root class="h-full pt-0 transition-shadow duration-200 hover:shadow-lg">
				<div class="bg-muted/50 aspect-[16/9] w-full overflow-hidden">
					{#if project.image}
						<img
							src={project.image}
							alt=""
							loading="lazy"
							decoding="async"
							class="h-full w-full object-contain p-4"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center">
							<span class="text-muted-foreground/20 text-6xl font-bold select-none">
								{project.name[0]}
							</span>
						</div>
					{/if}
				</div>

				<Card.Header class="gap-1 pb-2">
					<Card.Title class="line-clamp-1 text-lg">{project.name}</Card.Title>
					<div class="flex h-5 flex-nowrap items-center gap-3">
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
					<p class="text-muted-foreground line-clamp-3 min-h-[4.875rem] text-base leading-relaxed">
						{project.description}
					</p>
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
