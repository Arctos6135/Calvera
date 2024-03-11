<script lang="ts">
    import { response, activeResponses, formType } from "$lib/store";
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
	import { getContext } from "svelte";

  $: currentResponse = $response ? $activeResponses[$response] : undefined;
  </script>

<div class="md:max-w-[600px] mx-auto">
  {#if $response}
    <div class="mx-1">
      <div class="text-xl font-bold text-center mt-3 mb-1">{currentResponse?.type.name}</div>
      
      <div class="mb-2 flex justify-between items-center gap-2 font-bold">
        <span><span class="font-normal text-gray-400">Team:</span> {currentResponse?.team}</span>
        <span><span class="font-normal text-gray-400">Match:</span> {currentResponse?.match ?? "Pits"}</span>
      </div>

    </div>
    
    <hr class="my-2" />

    <FormFlow formType={$formType} />
  {:else}
    <FormsList />
  {/if}
</div>