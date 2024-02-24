<script lang="ts">
    import { response, activeResponses } from "$lib/store";
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
  </script>
  
  {#if $response}
    <FormFlow formType={$activeResponses[$response].type.type} />
    <p>Showing formflow</p>
  {:else}
    <FormsList />
    <p>not showing formflow</p>
    <p>response is {$response}</p>
  {/if}