<script lang="ts">
	import { page } from '$app/state';
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';

	const logoSrc = '/images/logo.png';

	const tabs = [
		{ label: 'home', href: '/' },
		{ label: 'projects', href: '/projects' },
		{ label: 'publications', href: '/publications' }
	];
</script>

<AppBar background="bg-inherit" shadow="shadow-2xl" trailSpaceX="!space-x-2">
	{#snippet lead()}
		<img src={logoSrc} alt="Logo" id="logo" class="h-auto w-40" />
	{/snippet}

	{#snippet trail()}
		<Navigation.Bar
			background="bg-inherit"
			height="h-12"
			tilesJustify="justify-center"
			classes="text-lg"
		>
			{#each tabs as { label, href }}
				<Navigation.Tile
					{href}
					selected={page.url.pathname === href}
					active="bg-primary-500"
					hover="hover:bg-secondary-950"
					classes="justify-center w-full"
				>
					{label.charAt(0).toUpperCase() + label.slice(1)}
				</Navigation.Tile>
			{/each}
		</Navigation.Bar>
	{/snippet}
</AppBar>
