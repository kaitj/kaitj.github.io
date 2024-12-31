<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let logoSrc = '/images/logo-light.png'; // Default logo source

	// Function to update logoSrc based on the current theme
	function updateLogo() {
		logoSrc = document.documentElement.classList.contains('dark')
			? '/images/logo-light.png'
			: '/images/logo-dark.png';
	}

	// Observe changes to the class attribute on the html element
	onMount(() => {
		const observer = new MutationObserver(updateLogo);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		updateLogo(); // Set initial logo
		return () => observer.disconnect(); // Clean up observer on unmount
	});
</script>

<AppBar background="bg-inherit" shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="lead">
		<img src={logoSrc} alt="Logo" id="logo" class="h-auto w-48" />
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<LightSwitch class="mr-4" />
		<nav class="list-nav">
			<TabGroup
				justify="justify-center"
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				rounded=""
				border=""
				class="items-center w-full text-lg"
			>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
				<TabAnchor href="/projects" selected={$page.url.pathname === '/projects'}
					>Projects</TabAnchor
				>
				<TabAnchor href="/publications" selected={$page.url.pathname === '/publications'}
					>Publications</TabAnchor
				>
			</TabGroup>
		</nav>
	</svelte:fragment>
</AppBar>
