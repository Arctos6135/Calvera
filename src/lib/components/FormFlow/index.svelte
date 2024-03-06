<script lang="ts">
	import { activeResponses, response, responseQueue, errors } from "$lib/store";
	import type { Form } from "$lib/types";
	import Input from "./Input.svelte";
    import { setContext } from "svelte";
    import { goto } from "$app/navigation";
	import Section from "./Section.svelte";

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

    //Idk how this works I just copied it from polaris :)
    //I think it just updates $error to be accurate based on whats in the error record created below
    let error: Record<string, Record<string, string | undefined>> = {};
    $: {
        if ($response) {
            $errors[$response] = Object.values(error).reduce(
                (prev, cur) =>
                    prev ||
                    Object.values(cur).reduce(
                        (prev, cur) => prev || cur != undefined,
                        false
                    ),
                false
            );
        }
    }

    $: setContext("id", $response)
</script>

{#if $response}
    <div>
        

        {#each formType.sections as section}       
            <Section {section} bind:errors={error[section.id]} />

            <div class="mt-5"></div>
        {/each}
        <button on:click={() => submitResponse()} disabled={$errors[$response]}>Submit</button>
        <button on:click={() => deleteResponse()}>Delete</button>
    </div> 
{/if}
