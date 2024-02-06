<script lang="ts">
	import type { Dropdown } from "$lib/types";

    export let component: Dropdown;
    export let label = "Dropdown";

    // To set a default selection, update this value
    // when declaring the component
    export let choice: string;

    // Wrap the validator in another function
    // so we can update the error string in this 
    // which is returned by the validator component.
    export let error: string | undefined = undefined;
    let runValidator = () => {
        error = component.validator(choice);
    }

    $: {
        choice;
        runValidator();
    }

    // Run the validator at least once before mount
    runValidator();
</script>

<div class="my-2">
    <div class="sm:flex justify-between items-center gap-2">
        <span
            class="text-xl min-w-max"
        >{label}</span>

        <span
            class="flex sm:inline mt-1 sm:mt-0">
        <!-- Display the dropdown menu if manual is false -->
            {#if !component.manual}
                <select
                    bind:value={choice}
                    on:change={runValidator}
                    class="flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
                >{#each component.options as option}
                        <option
                            class="cursor-pointer"
                            value={option}
                        >{option}</option>
                    {/each}
                </select>
            {:else}
            
            <!-- Display a text input field if manual is true -->
                <input
                    type="text"
                    bind:value={choice}
                    on:blur={runValidator}
                    class="flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
                />
            {/if}
        </span>
    </div>

    {#if error != undefined}
        <div class="text-red-700 text-md font-bold w-max ml-[auto]">{error}</div>
    {/if}
</div>