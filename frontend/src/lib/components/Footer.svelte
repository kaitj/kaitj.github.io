<script lang="ts">
	import { CalendarIcon, GithubIcon, LinkedinIcon, MailIcon } from '@lucide/svelte';
	import { AppBar, Navigation } from '@skeletonlabs/skeleton-svelte';

	const tabs = [
		{ href: 'mailto:jason.kai@childmind.org', icon: MailIcon },
		{ href: 'https://github.com/kaitj', icon: GithubIcon },
		{ href: 'https://linkedin.com/in/jasonkai', icon: LinkedinIcon },
		{ href: 'https://cal.com/jasonkai/coffee-chat?duration=30', icon: CalendarIcon }
	];
</script>

<hr />

<AppBar
	background="bg-transparent"
	classes="mx-auto items-center"
	toolbarGridCols="grid-cols-1"
	shadow="shadow-2xl"
>
	<Navigation.Bar background="bg-inherit" height="h-8" tilesJustify="items-center">
		{#each tabs as { href, icon }}
			<Navigation.Tile {href} target="_blank" classes="hover:bg-transparent hover:text-primary-500 justify-center">
				<svelte:component this={icon} />
			</Navigation.Tile>
		{/each}
	</Navigation.Bar>
</AppBar>
