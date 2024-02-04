<script lang="ts">
    import { goto } from "$app/navigation";
    import { submitResponse, deleteResponse } from "$lib/actions";
    import { activeResponses, errors, response } from "$lib/store";

    const setResponse = (id: number) => {
        $response = id;
        goto("/form");
    };

    $: responses = Object.values($activeResponses);
</script>

<div class="py-4">
    <span class="text-2xl text-text block mb-2 font-bold">Forms</span>
    <hr class="text-text/50 mb-2" />
    <ul class="max-h-[25vh] pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-primary">
      {#each responses as response (response.id)}
        <li class="flex button clickable mt-1 bg-primary rounded-xl !py-1.5 !px-3 !font-normal">
          <!-- Main button that takes you to the response -->
          <button class="flex-auto text-white text-left flex flex-col sm:block"
            on:click={() => setResponse(response.id)}
          >
          <!-- These two are wrapped in span because on mobile we want to display them on separate lines -->  
          <span><span class="font-normal text-gray-400">Match: </span><span class="">{response.match}</span></span>
          <!-- Add a space between them on desktop -->
          <span class="sm:ml-5"><span class="font-normal text-gray-400">Team: </span><span class="">{response.team}</span></span>
          </button>

          <!-- The submit and delete buttons -->
          <span class="flex">
            <button
              class="button clickable !px-2 !py-1 !bg-enabled mr-1 !font-normal"
              on:click={() => deleteResponse(response.id)}>🗑️ Delete</button
            ><button
              class="button clickable !px-2 !py-1 !bg-enabled !font-normal"
              disabled={$errors[response.id]}
              on:click={() => submitResponse(response.id)}>✔ Submit</button
            >
          </span>
        </li>
      {/each}
    </ul>
  </div>