<script lang="ts">
    import { goto } from "$app/navigation";
    import { deleteResponse, unsubmitResponse } from "$lib/actions";
    import { errors, responseQueue } from "$lib/store";
  
  </script>

  <div>
    <span>
        <hr class="mt-3"/>
        <ul class="max-h-[25vh] pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-enabled scrollbar-track-primary">
            {#each $responseQueue as response (response.id)}
                <li class="flex transition-all button clickable mt-1 bg-primary rounded-xl !py-1.5 !px-3 !font-normal">
                    <!-- Main button that takes you to the response -->
                    <!-- <button class="flex-auto text-white text-left flex flex-col sm:block"
                        on:click={() => setResponse(response.id)}
                    > -->

                    <span class="flex-auto text-white text-left flex flex-col sm:block">
                        <!-- These texts are wrapped in span because on mobile we want to display them on separate lines -->  
                        <span class="block sm:inline font-normal text-gray-400">{response.type.name}</span>
                        {#if response?.type?.name != "Pit Scouting"}
                            <!-- Add a space between them on desktop -->
                            <span class="block sm:inline "><span class="font-normal text-gray-400 sm:ml-5">Match: </span>{response.match}</span>
                        {/if}
                        <!-- Add a space between them on desktop -->
                        <span class="block sm:inline sm:ml-5"><span class="font-normal text-gray-400">Team: </span>{response.team}</span>
                    </span>
                    <!-- </button> -->
    
                    <!-- The submit and delete buttons -->
                    <span class="flex">
                        <button
                            class="button clickable transition-all !px-2 !py-1 !bg-enabled mr-1 !font-normal"
                            on:click={() => deleteResponse(response.id)}>🗑️ Delete</button
                        ><button
                            class="button clickable transition-all !px-2 !py-1 !bg-enabled !font-normal"
                            disabled={$errors[response.id]}
                            on:click={() => unsubmitResponse(response.id)}>↩️ Unsubmit</button>
                    </span>
                </li>
            {/each}
        </ul>
    </span>
  </div>