<script lang="ts">
    import type { Section } from "$lib/types";
    import { activeResponses } from "$lib/store";
    import Input from "./Input.svelte";
	import { getContext } from "svelte";
    export let section: Section;
    export let errors: Record<string, string | undefined> = {};

    const id: number = getContext("id");
</script>
  
<div class="flex flex-col">
    <span class="text-xl font-bold mb-2 mt-1">{section.header}</span>
    {#each section.inputs as input (input)}
        <div>
            {#if !(input.component.id == "serious foul reason") || ($activeResponses[id].data["serious foul"] != "None")}
                <Input bind:error={errors[input.component.id]} {input} />
            {/if}
        </div>
    {/each}
</div>

  