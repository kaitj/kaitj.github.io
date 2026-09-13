<script lang="ts">
	import { cn } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let activeYear = $state<number | null>(null);

	$effect(() => {
		activeYear = data.groups[0]?.year ?? null;
		const sections = document.querySelectorAll<HTMLElement>('section[id^="pub-"]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeYear = Number(entry.target.id.replace('pub-', ''));
					}
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<div class="w-full min-w-0">
	<div class="container mx-auto mt-8 mb-4 max-w-3xl px-4">
		<h1 class="text-3xl font-bold md:text-4xl">Research</h1>
	</div>

	<div
		class="border-border bg-background/90 sticky z-10 border-b backdrop-blur-sm"
		style="top: var(--navbar-height)"
	>
		<div class="container mx-auto max-w-3xl px-4 py-2">
			<div
				class="flex [scrollbar-width:none] flex-nowrap gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
			>
				{#each data.groups.toReversed() as { year }}
					<a
						href="#pub-{year}"
						class={cn(
							'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
							activeYear === year
								? 'bg-primary text-primary-foreground border-primary'
								: 'border-border text-muted-foreground hover:bg-accent hover:text-foreground'
						)}
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

			{#each data.groups as { year, pubs }}
				<section id="pub-{year}" class="scroll-mt-36 md:scroll-mt-44">
					<div class="relative mb-6 flex items-center">
						<div
							class="bg-primary ring-background absolute left-3 z-9 size-3 -translate-x-1/2 rounded-full ring-4"
						></div>
						<span class="ml-6 text-xl font-bold md:ml-8 md:text-2xl">{year}</span>
					</div>

					{#each pubs as pub}
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
