<script lang="ts">
    import type { Counter } from "$lib/types";
    import { activeResponses } from "$lib/store";
	import { getContext, onMount } from "svelte";

    // Set default values if fields are left as undefined
    export let component: Counter;
    const min = component.min ?? 0;
    const max = component.max ?? 256;
    const initialValue = component.initialValue ?? min;
    const hasButtons = component.hasButtons ?? true;

    export let count = initialValue;
    
    export const id: number = getContext("id")

    $: count = Number($activeResponses[id].data[component.id])

    onMount( () => {
        if (Number($activeResponses[id].data[component.id]) === undefined) {
            $activeResponses[id].data[component.id] = 0;
        }}
    )
    
    // Count is considered to be valid if error
    // is undefined!
    export let error: string | undefined = undefined;

    /**
     * Ensure that the input is an actual number,
     * not less than min, and not greater than max.
     */
    const validateInput = () => {
        if (!Number.isInteger(count)) {
            // If the inputted value is NOT a number, this will set the counter
            // to its initial value
            if (count == undefined || count == null || count.toString().trim().length == 0) {
                error = undefined;
                count = initialValue;
            } else {
                error = "Number must be an integer!";
            }
        } else if (parseInt(count.toString()) < min) {
            error = `Number must be greater than ${min}!`;
        } else if (parseInt(count.toString()) > max) {
            error = `Number must be less than ${max}!`;
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
                on:blur={validateInput}
                class="bg-primary rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
            />

            <!-- Add and subtract buttons -->
            <button
                on:click={() => incrementCount(-1)}
                class="button clickable"
            >-</button>
            <button
                on:click={() => incrementCount(1)}
                class="button clickable"
            >+</button>
        </span>
    </div>
    {#if (error !== undefined)}
        <div class="text-red-700 text-md font-bold w-max ml-[auto]">{error}</div>
    {/if}
</div>