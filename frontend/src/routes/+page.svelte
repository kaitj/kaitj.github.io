<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="container px-4">
	<div class="flex flex-col items-center text-center">
		<Avatar
			name="Jason Kai"
			src="/images/headshot.jpg"
			border="border-4 border-surface-300-600-token"
			size="w-48"
		/>
		<h3 class="h3 mt-4">Post Doctoral Fellow @ Child Mind Institute</h3>
		<div class="mt-4 md:space-y-4 space-y-6 text-justify text-lg">
			<p>
				I&apos;m a researcher and software developer with a passion for leveraging diverse
				technologies to drive advancements in medical research. In my current role, I develop and
				optimize reproducible infrastructures to assist development and delivery of new products.
				Additionally, I contribute to open-source projects and regularly co-organize hackathons to
				foster collaboration.
			</p>
			<p>
				Previously, I earned my PhD in the
				<a
					href="https://khanlab.ca"
					target="_blank"
					rel="noreferrer"
					class="hover:text-primary-500 underline"
				>
					Khan Computational Imaging Lab
				</a>
				at the University of Western Ontario, where my research involved engineering processing pipelines
				for reproducible analysis and applying machine learning to large datasets to study the human
				brain. Prior to that, I completed a Bachelor&apos;s of Engineering from McMaster University.
			</p>
		</div>
	</div>
</div>
