<script lang="ts">
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>
	<title>Jason Kai</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<!-- Header -->
	<header class="top-0 z-10 backdrop-blur-lg">
		<Navbar />
	</header>

	<!-- Main -->
	<main class="flex-grow">
		<slot />
	</main>

	<!-- Footer -->
	<footer>
		<Footer />
	</footer>
</div>
