<script lang="ts">
	import { activeResponses, response, responseQueue } from "$lib/store";
	import type { Form } from "$lib/types";
	import Input from "./Input.svelte";
    import { setContext } from "svelte";
    import { goto } from "$app/navigation";

    export let formType: Form;

        export const deleteResponse = () => {
        if (!$response) return;
        const res = $activeResponses;
        delete res[$response];
        $activeResponses = res;
        $responseQueue = $responseQueue.filter(
        (response) => response.id != $response
        );
        $response = null;
        goto("/", { replaceState: true });
    };

    export const submitResponse = () => {
        if (!$response) return;
        const responses = $activeResponses;
        const res = responses[$response];
        delete responses[$response];
        $activeResponses = responses;
        $responseQueue = [...$responseQueue, res];
        $response = null;
        goto("/", { replaceState: true });
    };

    $: formType = $activeResponses[Number($response)].type.type

    $: setContext("id", $response)
</script>

<div>
    

    {#each formType.sections as section}

        <span class="text-2xl text-text block mb-2 text-center font-bold">{section.header}</span>
        <hr class="text-text/50 mb-2" />

        {#each section.inputs as input}
            <Input group={input} />
        {/each}


        <div class="mt-5"></div>
    {/each}
    <button on:click={() => submitResponse()}>Submit</button>
    <button on:click={() => deleteResponse()}>Delete</button>
</div> 

