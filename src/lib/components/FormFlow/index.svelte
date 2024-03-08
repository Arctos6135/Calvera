<script lang="ts">
	import { activeResponses, response, responseQueue, errors } from "$lib/store";
	import type { Form } from "$lib/types";
	import Input from "./Input.svelte";
    import { setContext } from "svelte";
    import { goto } from "$app/navigation";
	import Section from "./Section.svelte";

    export let formType: Form | undefined;

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
        {#if formType}
            {#each formType.sections as section}       
                <Section {section} bind:errors={error[section.id]} />

                <div class="mt-5"></div>
            {/each}
            <!-- <button 
                class="rounded-md p-2 shadow-sm border-2 bg-error/50 border-error hover:bg-error/40 text-text/80"
                on:click={() => submitResponse()} disabled={$errors[$response]}
            >Submit</button>
            <button 
                on:click={() => deleteResponse()}
                class="rounded-md p-2 shadow-sm border-2 bg-success/50 border-success hover:bg-success/40 text-text/80 disabled:bg-success/10 disabled:border-success/20"
            >Delete</button> -->
            <div class="text-center">
                <button
                    class="button clickable text-xl !px-5 !py-2 !bg-enabled mr-3 !font-normal"
                    on:click={() => deleteResponse()}>🗑️ Delete</button
                ><button
                    class="button clickable text-xl !px-5 !py-2 !bg-enabled ml-3 !font-normal"
                    on:click={() => submitResponse()}>✔ Done</button
                >
            </div>
        {:else}
            <div class="text-center">
                <div class="font-bold text-3xl mb-1 mt-12">No Valid Form</div>
                <button
                    on:click={() => goto("/")}
                    class="button clickable mt-7"
                ><span
                    class="font-normal"
                    >Return to
                </span><span
                    class="font-bold"
                    >Calvera
                </span>
                </button>
            </div>
        {/if}
    </div> 
{/if}
