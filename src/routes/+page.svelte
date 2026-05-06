<script lang="ts">
	import headshot from '$lib/assets/images/headshot.jpg?enhanced';
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="container mx-auto max-w-4xl px-4 py-8 md:py-16">
	<div class="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
		<div class="my-auto flex shrink-0 flex-col items-center gap-3">
			<enhanced:img
				src={headshot}
				alt="Headshot"
				loading="lazy"
				class="ring-border min-w-48 rounded-full ring-4 md:min-w-56"
			/>
			<Badge variant="secondary" class="mt-4 text-sm md:text-base">
				Post Doctoral Fellow · Child Mind Institute
			</Badge>
		</div>

		<div class="space-y-4 text-base md:text-xl">
			<p>      	
				I am a software developer who builds robust systems and tooling, driving reliable, 
				scalable infrastructure that teams depend on. At Child Mind Institute, I design and 
				maintain reproducible data infrastructure, lead open-source projects, and co-organize 
				hackathons to foster collaboration across the scientific and engineering community. 
			</p>
			<p>
				My background spans full-stack development, containerized pipeline orchestration, and                                                                                                                                
      		    machine learning systems. I earned my PhD in the <a
					href="https://khanlab.ca"
					target="_blank"
					rel="noreferrer"
					class="hover:text-primary font-medium underline underline-offset-4"
					>Khan Computational Imaging Lab</a
				> (University of Western Ontario), where I built large-scale data processing pipelines and
				applied machine learning to high-dimensional datasets. Prior to that, I completed a 
				Bachelor&apos;s of Engineering from McMaster University.
			</p>
		</div>
	</div>
</div>
