<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		id: string;
		leading?: Snippet;
		children?: Snippet; // trailing icon
	}

	let { id, leading, children, ...rest }: Props = $props();
</script>

<div class="wrapper">
	{#if leading}
		<span class="icon leading">{@render leading()}</span>
	{/if}
	<input {id} {...rest} />
	{#if children}
		<span class="icon trailing">{@render children()}</span>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		background: var(--color-neutral-soft-1);
		border: 1px solid #e2e7f1;
		border-radius: 7px;
		padding: 0 0.7rem;
		width: 100%;
	}

	.wrapper:focus-within {
		border-color: var(--color-main);
		box-shadow: 0 0 0 3px var(--color-main-light-0);
	}

	input {
		flex: 1;
		min-width: 0;
		border: none;
		background: none;
		padding: 0.48rem 0;
		font-size: 0.82rem;
		color: var(--color-neutral-dark);
	}

	input:focus {
		outline: none;
		box-shadow: none;
	}

	.icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		color: var(--color-neutral-mid);
		line-height: 1;
	}

	.icon.leading {
		font-size: 0.82rem;
		user-select: none;
	}

	.wrapper :global(svg) {
		display: block;
		width: 14px;
		height: 14px;
	}
</style>
