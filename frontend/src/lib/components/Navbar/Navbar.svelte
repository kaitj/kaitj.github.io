<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';

	const logoSrc = '/images/logo-light.png';

	const tabs = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Publications', href: '/publications' }
	];
</script>

<AppBar background="bg-inherit" shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="lead">
		<img src={logoSrc} alt="Logo" id="logo" class="h-auto w-48" />
	</svelte:fragment>

	<svelte:fragment slot="trail">
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
				{#each tabs as {label, href}}
					<TabAnchor href={href} selected={$page.url.pathname === href}
						>{label}</TabAnchor
					>
				{/each}
			</TabGroup>
		</nav>
	</svelte:fragment>
</AppBar>
