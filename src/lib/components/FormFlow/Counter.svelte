<script lang="ts">
        import type { Counter } from "$lib/types";

    export let component: Counter;
    const initialValue = component.initialValue || 0;
    // Why is zero falsy 😢
    const min = (component.min == undefined && Number.MIN_SAFE_INTEGER || component.min) as number;
    const max = (component.max == undefined && Number.MAX_SAFE_INTEGER || component.max) as number;
    const hasButtons = component.hasButtons || true;

    export let count = initialValue;
    
    // Count is considered to be valid if error
    // is undefined!
    export let error: string | undefined = undefined;

    const validateInput = () => {
        console.log("Yessir!")
        if (!Number.isInteger(count)) {
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

<div class="px-5">
    <div class="flex justify-between items-center">
        <span
            class="text-xl"
        >{component.label}</span>
        <span>
                <input
                type="number"
                pattern="[0-9]*"
                placeholder={initialValue.toString()}
                min={min}
                max={max}
                bind:value={count}
                on:blur={validateInput}
                class="bg-primary rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover"
            />
            <button
                on:click={() => incrementCount(-1)}
                class="bg-primary rounded-xl px-4 py-2 text-white font-bold hover:drop-shadow-btn-hover hover:bg-hover active:filter-none active:bg-click"
            >-</button>
            <button
                on:click={() => incrementCount(1)}
                class="bg-primary rounded-xl px-4 py-2 text-white font-bold hover:drop-shadow-btn-hover hover:bg-hover active:filter-none active:bg-click"
            >+</button>
        </span>
    </div>
    {#if (error !== undefined)}
        <span class="text-red-700 text-md font-bold">{error}</span>
    {/if}
</div>