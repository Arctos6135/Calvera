<script lang="ts">
	import type { Dropdown } from "$lib/types";

    export let component: Dropdown;
    export let label = "Dropdown";

    // To set a default selection, update this value
    // when declaring the component
    export let choice: string;

    let error: string | undefined;
    let runValidator = () => {
        error = component.validator(choice);
    }
</script>

<div>
    <div class="flex justify-between items-center gap-2">
        <span
            class="text-xl min-w-max"
        >{label}</span>
        {#if !component.manual}
            <select
                bind:value={choice}
                on:change={runValidator}
                class="bg-primary min-w-max w-64 rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
            >{#each component.options as option}
                    <option
                        class="cursor-pointer"
                        value={option}
                    >{option}</option>
                {/each}
            </select>
        {:else}
            <input
                type="text"
                bind:value={choice}
                on:blur={runValidator}
                class="bg-primary rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
            />
        {/if}
    </div>

    {#if error != undefined}
        <span class="text-red-700 text-md font-bold">{error}</span>
    {/if}
</div>