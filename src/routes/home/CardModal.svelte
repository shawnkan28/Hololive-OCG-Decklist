<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { Card as cardData } from '$lib/types';
	import { lookupRarity } from '$lib/format';
	import Toggle from '$lib/components/Toggle.svelte';
	import { getIdentifier } from '$lib/format';
	import { invalidateAll } from '$app/navigation';

	let {
		card = $bindable(),
		isOpen = $bindable(),
		modalEscape,
		modalEnter
	}: {
		card?: cardData | null;
		isOpen: boolean;
		modalEscape?: () => void;
		modalEnter?: () => void;
	} = $props();

	let owned = $state('Not owned');
	let qtyInput = $state<ReturnType<typeof Input> | null>(null);

	$effect(() => {
		if (card?.owned) {
			owned = 'Owned';
		} else {
			owned = 'Not owned';
		}
	});

	$effect(() => {
		// When attempting to Open Modal
		if (isOpen) {
			qtyInput?.focus();
		}
	});

	async function save() {
		const formData = new FormData();
		if (card) formData.append('identifier', getIdentifier(card));
		formData.append('owned', owned);
		try {
			const response = await fetch('?/updateCollection', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				await invalidateAll();
			} else {
				console.error('Failed to update collection');
			}
		} catch (err) {
			console.error('Network error saving card:', err);
		}
	}

	// I need this function because i set for text input if esc is pressed, it does not
	// Trigger the Listener for escape in root page.
	function escapePressed() {
		if (modalEscape) modalEscape();
	}
	function enterPressed() {
		save()
			.then(() => {
				if (modalEnter) modalEnter();
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<Modal bind:open={isOpen}>
	{#if card}
		<div class="modal-content">
			<!-- Card General Details -->
			<div class="info-section">
				<img src={card.image} alt={card.number} />
				<div style="display: flex; flex-direction: column; gap: 0.3rem;">
					<span
						style="font-size: 0.72rem; color: var(--color-neutral-mid); font-family: Consolas, monospace;"
						>{card.number}</span
					>
					<span
						style="line-height: 1; font-size: 1.02rem; font-weight: 700; text-transform: uppercase;"
						>{card.nameEn}</span
					>
					<div style="display: flex; gap: var(--gap); margin-top: 2px;">
						<div
							class="tag active"
							style={`--color: ${lookupRarity(card.rarity)}; cursor: default;`}
						>
							<div>{card.rarity}</div>
						</div>
						<div
							class="tag active"
							style="--color: var(--color-main); text-transform: uppercase; cursor: default;"
						>
							<div>{card.set}</div>
						</div>
					</div>
					<div style="display: flex;">
						<a href={card.url} rel="external">View on Yuyutei</a>
					</div>
				</div>
			</div>
			<!-- Card Input Fields -->
			<div class="card-form">
				<div class="card-row"><Toggle bind:value={owned} options={['Not owned', 'Owned']} /></div>
				<div class="card-row">
					<div>
						<div><label for="qty">QUANTITY</label></div>
						<Input
							onenter={enterPressed}
							onescape={escapePressed}
							bind:this={qtyInput}
							id="qty"
							type="text"
							placeholder="0"
						/>
					</div>
					<div>
						<div><label for="loc">LOCATION</label></div>
						<Input
							onenter={enterPressed}
							onescape={escapePressed}
							id="loc"
							type="text"
							placeholder="Binder, box, sleeve ..."
						/>
					</div>
				</div>
				<!-- <div class="card-row">
					<div>
						<div><label for="bprice">BOUGHT PRICE</label></div>
						<Input id="bprice" type="text" placeholder="¥" />
					</div>
					<div>
						<div><label for="sprice">SOLD PRICE</label></div>
						<Input id="sprice" type="text" placeholder="¥" />
					</div>
				</div>
				<div>
					<div><label for="mprice">MARKET PRICE</label></div>
					<Input id="mprice" type="text" placeholder="¥" />
				</div> -->
				<div style="text-align: right; margin-top: 25px;">
					<button
						class="button"
						onclick={() => {
							save()
								.then(() => {
									console.log('Complete');
									isOpen = false;
								})
								.catch((err) => console.error(err));
						}}>Save</button
					>
				</div>
			</div>
		</div>
	{/if}
</Modal>

<style>
	.modal-content img {
		aspect-ratio: 100 / 140;
		object-fit: contain;
		border-radius: 7px;
		width: 108px;
	}
	.modal-content .info-section {
		display: flex;
		padding-right: 2.5rem;
		gap: 1rem;
		padding-bottom: 1.05rem;
		border-bottom: 1px solid var(--color-neutral-soft);
	}
	.modal-content .card-form {
		margin-top: 0.95rem;
	}
	.card-row {
		display: flex;
		gap: 1rem;
		min-width: calc(500px + 1rem);
	}
	.card-row:not(last-child) {
		margin-bottom: 1rem;
	}
	.card-row > div {
		flex: 1;
	}
	label {
		color: rgba(0, 0, 0, 0.7);
		font-weight: 800;
		font-size: 0.7rem;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button {
		background: var(--color-main);
		color: white;
		border-radius: 999px;
		min-width: 50px;
		font-weight: bold;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.5rem 0.8rem;
		transition: ease 0.5s all;
	}
	.button:hover {
		background: var(--color-main-dark-0);
	}
</style>
