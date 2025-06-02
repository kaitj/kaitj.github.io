<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Jason Kai</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="top-0 z-10 backdrop-blur-lg">
		<Navbar />
	</header>

	<main class="flex-grow">
		{@render children()}
	</main>

	<footer>
		<Footer />
	</footer>
</div>
