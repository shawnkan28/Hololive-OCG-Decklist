<script lang="ts">
	// -----------------------------------------------------------------------------------------
	// IMPORTS
	// -----------------------------------------------------------------------------------------
	// Type
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	// INIT
	interface Props extends HTMLAttributes<HTMLDivElement> {
		onclick: (e: Event) => void;
		childen?: Snippet;
	}

	// -----------------------------------------------------------------------------------------
	// PROPERTIES / LOCAL STATES
	// -----------------------------------------------------------------------------------------
	let { onclick, children, ...rest }: Props = $props();

	// -----------------------------------------------------------------------------------------
	// FUNCTIONS
	// -----------------------------------------------------------------------------------------
	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onclick(e);
		}
	}
</script>

<div role="button" tabindex="0" {onclick} {onkeydown} {...rest}>
	{@render children?.()}
</div>

<style>
	div[role='button'] {
		cursor: pointer;
		user-select: none;
		--child-outline: none;
	}
	div[role='button']:focus-visible {
		outline: none;
	}
</style>
