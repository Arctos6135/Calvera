<script lang="ts">
        import type { Counter } from "$lib/types";

    
    export let label: string;

    // Set default values if fields are left as undefined
    export let component: Counter;
    const min = component.min ?? 0;
    const max = component.max ?? 256;
    const initialValue = component.initialValue ?? min;
    const hasButtons = component.hasButtons ?? true;

    export let count = initialValue;
    
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
        count = Math.max(min, Math.min(max, count + step));
    }
</script>

<div>
    <div class="flex items-center justify-between gap-2">
        <span
            class="text-xl min-w-max"
        >{label}</span>
        <span class="grid grid-cols-counter grid-rows-1 gap-1">
            <!-- Primary input fields -->
            <input
                type="number"
                pattern="[0-9]*"
                placeholder={initialValue.toString()}
                min={min}
                max={max}
                bind:value={count}
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
        <span class="text-red-700 text-md font-bold">{error}</span>
    {/if}
</div>