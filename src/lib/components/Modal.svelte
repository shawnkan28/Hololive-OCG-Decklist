<script lang="ts">
	import type { Snippet } from 'svelte';

	let { open = $bindable(false), children }: { open: boolean; children: Snippet } = $props();
	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (open) dialog?.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		open = false;
	}}
	// What this does is, when background is clicked, it will run the onclose() instructions.
	// Why we use e.target === dialog is because the background is part of the dialog. Those inside the dialog
	// is considered not part of the dialog. So its opposite of a backdrop.
	onclick={(e: MouseEvent) => {
		if (e.target === dialog) dialog.close();
	}}
>
	<div class="content">
		{@render closeBtn()}
		<div>
			{@render children()}
		</div>
	</div>
</dialog>

{#snippet closeBtn()}
	<button
		class="close-btn"
		onclick={() => {
			dialog?.close();
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
			<!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
			<path
				fill="currentColor"
				d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"
			/>
		</svg>
	</button>
{/snippet}

<style>
	dialog {
		padding: 0;
		overflow: auto;
		max-height: min(92vh, 920px);
		border-radius: 14px;
		border: none;
		box-shadow: 0 10px 24px rgba(84, 96, 140, 0.18);
	}
	dialog .content {
		position: relative;
		padding: 1.15rem 1.2rem 1.25rem;
		background: #fff;
		display: flex;
		flex-direction: column;
	}
	dialog .close-btn {
		position: absolute;
		top: 1.2rem;
		right: 1.15rem;
		height: 2rem;
		width: 2rem;
		display: grid;
		place-items: center;
		border-radius: 999px;
		color: var(--color-neutral-mid);
		transition: all ease 0.2s;
		border: none;
		background: none;
		cursor: pointer;
	}
	dialog .close-btn:hover {
		background: var(--color-neutral-soft);
		color: var(--color-neutral-dark);
	}
	.close-btn svg {
		height: 1rem;
		width: 1rem;
	}
</style>
