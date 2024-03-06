<script lang="ts">
    import type { Section } from "$lib/types";
    import Input from "./Input.svelte";
    export let section: Section;
    export let errors: Record<string, string | undefined> = {};
</script>
  
<div class="flex flex-col">
    <h2>{section.header}</h2>
    {#each section.inputs as input (input)}
        <div>
            <Input bind:error={errors[input.component.id]} {input} />
        </div>
    {/each}
</div>

  