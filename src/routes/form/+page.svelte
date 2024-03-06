<script lang="ts">
    import { response, activeResponses, formType } from "$lib/store";
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
  </script>
  
  {#if $response}
    <FormFlow formType={$formType} />
  {:else}
    <FormsList />
  {/if}
