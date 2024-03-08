<script lang="ts">
	import { activeResponses } from "$lib/store";
	import type { Dropdown } from "$lib/types";
	import { getContext } from "svelte";

    export let component: Dropdown;

    const id: number = getContext("id")

    $: if ($activeResponses[id].data[component.id] === undefined) {
        $activeResponses[id].data[component.id] = component.options[0]
    }
    export let error: string | undefined = undefined;
    
    // let runValidator = () => {
    //     error = component.validator(choice);
    // }

    // $: {
    //     choice = String($activeResponses[id].data[component.id])
    //     runValidator();
    // }

    // // Run the validator at least once before mount
    // runValidator();
</script>

<div class="my-2">
    <div class="sm:flex justify-between items-center gap-2">
        <span
            class="flex sm:inline mt-1 sm:mt-0">
        <!-- Display the dropdown menu if manual is false -->
            {#if !component.manual}
                <select
                    bind:value={$activeResponses[id].data[component.id]}
                    class="flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
                >
                    {#each component.options as option}
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
                    bind:value={$activeResponses[id].data[component.id]}
                    class="flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
                />
            {/if}
        </span>
    </div>

    {#if error != undefined}
        <div class="text-red-700 text-md font-bold w-max ml-[auto]">{error}</div>
    {/if}
</div>