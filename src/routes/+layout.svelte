<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onNavigate } from '$app/navigation';
	import '../app.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Jason Kai</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<div class="sticky top-0 z-10 backdrop-blur-lg" style="view-transition-name: navbar">
		<Navbar />
	</div>

	<main class="flex flex-grow items-center justify-center">
		{@render children()}
	</main>

	<Footer />
</div>
