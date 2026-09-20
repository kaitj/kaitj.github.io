<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		class: className,
		children
	}: {
		href: string;
		class?: string;
		children: Snippet;
	} = $props();
</script>

<a {href} target="_blank" rel="noreferrer" class={className}>
	{@render children()}
</a>
