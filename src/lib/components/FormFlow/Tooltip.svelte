<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	export let content: string;
	
	let tooltipVisible = false;
	let tooltipElement: HTMLSpanElement;
	let tooltipButton: HTMLButtonElement;


	// Handle clicks outside the tooltip
	const onClick = (event: MouseEvent) => {
		if (tooltipElement && tooltipButton && !(tooltipElement.contains(event.target as Node) || tooltipButton.contains(event.target as Node))) {
			tooltipVisible = false;
		}
	}

	onMount(() => {
		document.addEventListener("click", onClick);
	});

	onDestroy(() => {
		document.removeEventListener("click", onClick);	
	});
</script>

<span class="relative">
	<!-- Tooltip button -->
	<button bind:this={tooltipButton} class="clickable bg-primary rounded-full italic text-sm w-6 h-6 text-center" on:click={() => tooltipVisible = !tooltipVisible}>i</button>

	<!-- Tooltip -->
	<span 
	bind:this={tooltipElement} 
	class="absolute z-10 text-base bg-primary p-3 rounded-lg drop-shadow-btn-hover left-full right-[max(-50vw,-300px)] max-w-max transition-all opacity-0 translate-y-5 invisible"
	class:!visible={tooltipVisible}
	class:opacity-100={tooltipVisible}
	class:!translate-y-0={tooltipVisible}
	>
		{content}
	</span>
</span>