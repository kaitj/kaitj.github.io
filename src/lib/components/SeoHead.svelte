<script lang="ts">
	const SITE_URL = 'https://jasonkai.com';

	let {
		title,
		description,
		path,
		image
	}: {
		title: string;
		description: string;
		path: string;
		image?: string;
	} = $props();

	const url = $derived(`${SITE_URL}${path}`);
	const imageUrl = $derived(image ? `${SITE_URL}${image}` : undefined);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
	{/if}
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if imageUrl}
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>
