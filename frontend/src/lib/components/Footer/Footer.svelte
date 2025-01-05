<script lang="ts">
	import { AppBar, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { CalendarIcon, GithubIcon, LinkedinIcon, MailIcon } from 'svelte-feather-icons';
	
	const tabs = [
		{ href: 'mailto:jason.kai@childmind.org', icon: MailIcon, },
		{ href: 'https://github.com/kaitj', icon: GithubIcon },
		{ href: 'https://linkedin.com/in/jasonkai', icon: LinkedinIcon },
		{ href: 'https://cal.com/jasonkai/coffee-chat?duration=30', icon: CalendarIcon },
	]
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
		{#each tabs as tab}
			<TabAnchor target="_blank" href={tab.href} rel="noopener noreferrer">
				<svelte:component this={tab.icon} />
			</TabAnchor>
		{/each}
	</TabGroup>
</AppBar>
