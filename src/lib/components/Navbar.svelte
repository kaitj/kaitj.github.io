<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import logoSrc from '$lib/assets/images/logo.png?enhanced';
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
		return [
			block ? 'block' : '',
			'rounded-md px-4 py-2 transition-colors',
			active
				? 'bg-primary text-primary-foreground'
				: 'text-muted-foreground hover:bg-accent hover:text-foreground'
		]
			.filter(Boolean)
			.join(' ');
	}
</script>

<header class="shadow-2xl" bind:this={headerEl}>
	<div class="relative flex items-center justify-center px-4 py-2 md:justify-between">
		<enhanced:img src={logoSrc} alt="Logo" id="logo" class="h-16 w-auto md:h-20" />

		<button
			class="text-muted-foreground hover:bg-accent hover:text-foreground absolute right-4 rounded-md p-2 transition-colors md:hidden"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
			aria-expanded={menuOpen}
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
		<nav class="border-border border-t px-4 pb-3 text-center md:hidden">
			{#each tabs as { label, href }}
				<a {href} class={linkClass(href, true)}>{label}</a>
			{/each}
		</nav>
	{/if}
</header>
