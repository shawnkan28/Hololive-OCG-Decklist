<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '$lib/theme.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Hololive OCG - Collection</title>
</svelte:head>

{@render children()}
