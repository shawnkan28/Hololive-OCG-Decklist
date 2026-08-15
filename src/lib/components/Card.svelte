<script lang="ts">
	import ClickableDiv from '$lib/components/ClickableDiv.svelte';
	import { colorToHex } from '$lib/format';

	type Data = {
		url: string;
		number: string;
		nameEn: string;
		image: string;
		// priceJpy: number;
		colors: string[];
		// stockCount: number | null;
	};

	// -----------------------------------------------------------------------------------------
	// PROPERTIES / LOCAL STATES
	// -----------------------------------------------------------------------------------------
	let { data }: { data: Data } = $props();

	const hexColor = $derived(colorToHex(data.colors));
	const styleStr = $derived(
		hexColor
			.map((c, i) => {
				return `--color${i}: ${c};`;
			})
			.join(' ')
	);
	let wrapperClass = $derived(
		data.colors.length > 1 ? 'card dual' : data.colors.length === 0 ? 'card' : 'card tinted'
	);
</script>

<ClickableDiv
	style={styleStr}
	class={wrapperClass}
	onclick={() => {
		window.location.href = data.url;
	}}
>
	<div class="img-wrapper"><img src={data.image} alt={data.number} /></div>
	<div class="card-details">
		<div class="card-name">{data.nameEn}</div>
	</div>
</ClickableDiv>