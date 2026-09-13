<script lang="ts">
	import headshot from '$lib/assets/images/headshot.jpg?enhanced';
	import ogImage from '$lib/assets/images/headshot.jpg?url';

	const title = 'Jason Kai — Senior Scientific Software Developer';
	const description =
		'Personal site of Jason Kai, who builds scalable data pipelines, infrastructure, and open-source software.';
	const url = 'https://jasonkai.com/';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={`https://jasonkai.com${ogImage}`} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={`https://jasonkai.com${ogImage}`} />
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-8 md:py-16">
	<div class="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
		<div class="my-auto flex shrink-0 flex-col items-center gap-3">
			<enhanced:img
				src={headshot}
				alt="Headshot"
				loading="lazy"
				class="ring-border min-w-48 rounded-full ring-4 md:min-w-56"
			/>
			<div
				class="bg-secondary mt-4 flex w-fit max-w-64 flex-col items-center rounded-lg px-3 py-2 text-center"
			>
				<span class="text-sm leading-snug font-medium"> Senior Scientific Software Developer </span>
				<span class="text-muted-foreground text-xs leading-snug"> Child Mind Institute </span>
			</div>
		</div>

		<div class="space-y-4 text-base md:text-xl">
			<p>
				I'm a Senior Scientific Software Developer at Child Mind Institute, where I architect
				scalable data pipelines for large-scale multi-domain analysis and manage the infrastructure
				behind them, from HPC clusters to self-hosted CI/CD and deployments. I'm also an active
				supporter of open-source software, contributing to and maintaining tooling.
			</p>
			<p>
				I earned my PhD in Medical Biophysics, studying the brain, at the <a
					href="https://khanlab.ca"
					target="_blank"
					rel="noreferrer"
					class="hover:text-primary font-medium underline underline-offset-4"
					>Khan Computational Imaging Lab</a
				> (University of Western Ontario), building processing pipelines and applying machine learning
				to high-dimensional datasets, and hold a Bachelor of Engineering in Electrical & Biomedical Engineering
				from McMaster University.
			</p>
		</div>
	</div>
</div>
