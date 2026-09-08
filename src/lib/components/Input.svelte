<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		id: string;
		variant?: 'standard' | 'global';
		value?: string;
		leading?: Snippet;
		children?: Snippet; // trailing icon
	}

	let {
		id,
		value = $bindable(""),
		variant = 'standard',
		leading,
		children,
		...rest
	}: Props = $props();
</script>

<div
	class="wrapper"
	class:variant-standard={variant === 'standard'}
	class:variant-global={variant === 'global'}
>
	{#if leading}
		<span class="icon leading">{@render leading()}</span>
	{/if}
	<input {id} bind:value {...rest} />
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
		font-size: 0.75rem;
		color: var(--color-neutral-mid);
	}
	
	.variant-global {
		border-radius: 20px;
		padding: 0 0.7rem;
		background: white;
		border-color: color-mix(in srgb, var(--color-neutral-dark) 25%, #fff);
		min-width: 200px;
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
		font-size: inherit;
		padding: 0.48rem 0;
		color: var(--color-neutral-dark);
		padding: .45rem 0;
		line-height: 1;
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

	.wrapper:focus-within .icon {
		color: var(--color-main);
	}

	.icon.leading {
		font-size: 0.82rem;
		user-select: none;
	}
</style>
