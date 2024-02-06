<script lang="ts">
	import type { Component, Form } from "$lib/types";
	import Dropdown from "./Dropdown.svelte";
	import Input from "./Input.svelte";
    export let formType: Form;
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