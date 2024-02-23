<script lang="ts">
	import { activeResponses, response } from "$lib/store";
	import type { Form } from "$lib/types";
	import Input from "./Input.svelte";
    import { setContext } from "svelte";

    export let formType: Form;

    $: formType = $activeResponses[Number($response)].type.type

    $: setContext($response, "id")
</script>

<div>
    

    {#each formType.sections as section}
        <!-- Header -->
        <span class="text-2xl text-text block mb-2 text-center font-bold">{section.header}</span>
        <hr class="text-text/50 mb-2" />

        <!-- Each of the input types -->
        {#each section.inputs as input}
            <Input group={input} />
        {/each}

        <!-- Footer spacer -->
        <div class="mt-5"></div>
    {/each}
</div>