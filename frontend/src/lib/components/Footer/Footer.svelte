<script lang="ts">
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { Github, Linkedin, Mail, Twitter } from 'lucide-svelte';
</script>

<AppBar 
	background="bg-transparent"
    gridColumns="grid-cols-1" 
    shadow="shadow-2xl" 
    slotDefault="place-self-center"
>
	<TabGroup
		justify="justify-center"
		hover="hover:None"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="items-center w-full"
	>
		<TabAnchor target="_blank" href="mailto:jason.kai@childmind.org"><Mail /></TabAnchor>
		<TabAnchor target="_blank" href="https://github.com/kaitj"><Github /></TabAnchor>
		<TabAnchor target="_blank" href="https://twitter.com/jasonkai"><Twitter /></TabAnchor>
		<TabAnchor target="_blank" href="https://linkedin.com/in/jasonkai"><Linkedin /></TabAnchor>
	</TabGroup>
</AppBar>
