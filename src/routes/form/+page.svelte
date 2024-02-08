<script lang="ts">
    import { response } from "$lib/store";
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
  </script>
  
  {#if $response}
    <FormFlow />
  {:else}
    <FormsList />
  {/if}