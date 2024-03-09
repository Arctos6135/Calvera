<script lang="ts">
    import type { Counter } from "$lib/types";
    import { activeResponses } from "$lib/store";
	import { getContext, onMount } from "svelte";

    onMount( () => {
        if ($activeResponses[id].data[component.id] === undefined) {
            $activeResponses[id].data[component.id] = 
                component.initialValue ?? 0;
        }
    });

    // Set default values if fields are left as undefined
    export let component: Counter;
    const min = component.min ?? 0;
    const max = component.max ?? 256;
    const initialValue = component.initialValue ?? min;
    const hasButtons = component.hasButtons ?? true;

    export let count = initialValue;
    
    export const id: number = getContext("id")

    $: count = Number($activeResponses[id].data[component.id])
    
    // Count is considered to be valid if error
    // is undefined!
    export let error: string | undefined = undefined;

    $: {
        const num = $activeResponses[id].data[component.id]
        if (!Number.isInteger(num)) {
            error = "Number can't be empty";
        } else if (min > parseInt(num.toString())) {
            error = `Number must be at least ${component.min}`;
        } else if (max < parseInt(num.toString())) {
            error = `Number can't be higher then ${component.max}`;
        } else {
            error = undefined;
        }
    }

    /**
     * Increments count by step. Automatically ensures the number does not
     * go out of bounds.
     * 
     * @param step the number count should be incremented by. Can be negative to decrement.
     */
    const incrementCount = (step = 1) => {
        $activeResponses[id].data[component.id] = Math.max(min, Math.min(max, Number($activeResponses[id].data[component.id]) + step));
    }
</script>

<div class="my-2">
    <div class="block sm:flex items-center justify-between gap-2 ">

        <span class="grid grid-cols-counter grid-rows-1 gap-1 mt-1 sm:mt-0">
            <!-- Primary input fields -->
            <input
                type="number"
                pattern="[0-9]*"
                placeholder={initialValue.toString()}
                min={min}
                max={max}
                bind:value={$activeResponses[id].data[component.id]}
                class="bg-primary rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
            />

            <!-- Add and subtract buttons -->
            <button
                on:click={() => incrementCount(-1)}
                class="button clickable transition-all"
            >-</button>
            <button
                on:click={() => incrementCount(1)}
                class="button clickable transition-all"
            >+</button>
        </span>
    </div>
    {#if (error !== undefined)}
        <div class="text-red-700 text-md font-bold w-max ml-[auto]">{error}</div>
    {/if}
</div>