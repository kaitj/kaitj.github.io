<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import logoSrc from '$lib/assets/images/logo.png?enhanced';
	import { cn } from '$lib/utils';
	import { Menu, X } from '@lucide/svelte';

	const tabs = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Research', href: '/research' }
	];

	let menuOpen = $state(false);
	let headerEl = $state<HTMLElement | undefined>(undefined);

	onNavigate(() => {
		menuOpen = false;
	});

	$effect(() => {
		if (!headerEl) return;
		const observer = new ResizeObserver(() => {
			document.documentElement.style.setProperty('--navbar-height', `${headerEl!.offsetHeight}px`);
		});
		observer.observe(headerEl);
		return () => observer.disconnect();
	});

	function linkClass(href: string, block = false) {
		const active = page.url.pathname === href;
		return cn(
			block && 'block',
			'rounded-md px-4 py-2 transition-colors',
			active
				? 'bg-primary text-primary-foreground'
				: 'text-muted-foreground hover:bg-accent hover:text-foreground'
		);
	}
</script>

<header class="shadow-2xl" bind:this={headerEl}>
	<div
		class="relative flex items-center justify-center px-4 py-[var(--navbar-py)] md:justify-between"
	>
		<enhanced:img src={logoSrc} alt="Logo" id="logo" class="h-[var(--navbar-logo-h)] w-auto" />

		<button
			class={cn(
				'absolute right-4 rounded-md p-2 transition-colors md:hidden',
				menuOpen
					? 'bg-accent text-foreground'
					: 'text-muted-foreground hover:bg-accent hover:text-foreground'
			)}
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
			aria-controls="mobile-nav"
		>
			{#if menuOpen}
				<X class="size-5" />
			{:else}
				<Menu class="size-5" />
			{/if}
		</button>

		<nav class="hidden gap-1 text-lg md:flex">
			{#each tabs as { label, href }}
				<a {href} class={linkClass(href)}>{label}</a>
			{/each}
		</nav>
	</div>

	{#if menuOpen}
		<nav id="mobile-nav" class="border-border border-t px-4 pb-3 text-center md:hidden">
			{#each tabs as { label, href }}
				<a {href} class={linkClass(href, true)}>{label}</a>
			{/each}
		</nav>
	{/if}
</header>
