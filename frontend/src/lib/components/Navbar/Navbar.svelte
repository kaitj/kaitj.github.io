<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
</script>

<AppBar background="bg-inherit" shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="lead">
		<!-- Logo -->
		<!-- Add a logo here -->
		Jason Kai
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
		<nav class="list-nav">
			<TabGroup
				justify="justify-center"
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				rounded=""
				border=""
				class="items-center w-full"
			>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
				<TabAnchor href="#" selected={$page.url.pathname === '#'}>Projects</TabAnchor>
				<TabAnchor href="#" selected={$page.url.pathname === '#'}>Publications</TabAnchor>
			</TabGroup>
		</nav>
	</svelte:fragment>
</AppBar>
