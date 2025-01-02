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

	const tabs = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/publications', label: 'Publications' }
	];
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
				{#each tabs as tab}
					<TabAnchor href={tab.href} selected={$page.url.pathname === tab.href}
						>{tab.label}</TabAnchor
					>
				{/each}
			</TabGroup>
		</nav>
	</svelte:fragment>
</AppBar>
