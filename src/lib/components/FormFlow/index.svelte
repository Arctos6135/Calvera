<script lang="ts">
	import { activeResponses, response } from "$lib/store";
	import type { Form } from "$lib/types";
	import Input from "./Input.svelte";
    import { setContext } from "svelte";

    export let formType: Form;

    $: formType = $activeResponses[Number($response)].type.type

    $: setContext($response, "id")
</script>

<!-- <div>
    

    {#each formType.sections as section}

        <span class="text-2xl text-text block mb-2 text-center font-bold">{section.header}</span>
        <hr class="text-text/50 mb-2" />

        {#each section.inputs as input}
            <Input group={input} />
        {/each}


        <div class="mt-5"></div>
    {/each}
</div> -->
{#if formType && $response}
    <Input group={{
        type: "input",
        label: "Score amp",
        component: {
            type: "Counter",
            id: "auto score amp",
            hasButtons: true,
            initialValue: 0,
            min: 0
        }
        
    }} />
{:else}
    <p>response = {$response}</p>
{/if}


