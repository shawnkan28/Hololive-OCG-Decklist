<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import { colorToHex, lookupSet } from '$lib/format';
	import type { Card } from '$lib/types';

	// -----------------------------------------------------------------------------------------
	// PROPERTIES / LOCAL STATES
	// -----------------------------------------------------------------------------------------
	let { data, callback }: { data: Card; callback?: () => void } = $props();

	const hexColor = $derived(colorToHex(data.colors));
	const styleStr = $derived(
		hexColor
			.map((c, i) => {
				return `--color${i}: ${c};`;
			})
			.join(' ')
	);
	const wrapperClass = $derived(
		data.colors.length > 1 ? 'card dual' : data.colors.length === 0 ? 'card' : 'card tinted'
	);
	const setStyle = $derived(`--color: ${lookupSet(data.set)};`);

	function clicked() {
		if (callback) callback();
		else window.location.href = data.url;
	}
</script>

<ClickableDiv style={styleStr} class={wrapperClass} onclick={clicked}>
	<div class="img-wrapper"><img src={data.image} alt={data.number} /></div>
	<div class="card-details">
		<div class="card-name">{data.nameEn}</div>
		<div class="set" style={setStyle}><span>{data.number}</span></div>
	</div>
</ClickableDiv>
