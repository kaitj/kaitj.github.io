<script lang="ts">
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { Calendar, Github, Linkedin, Mail } from 'lucide-svelte';
</script>

<hr />
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
		<TabAnchor target="_blank" href="https://linkedin.com/in/jasonkai"><Linkedin /></TabAnchor>
		<TabAnchor target="_blank" href="https://cal.com/jasonkai/coffee-chat?duration=30"
			><Calendar /></TabAnchor
		>
	</TabGroup>
</AppBar>
