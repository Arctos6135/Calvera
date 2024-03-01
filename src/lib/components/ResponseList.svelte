<script lang="ts">
    import { goto } from "$app/navigation";
    import { deleteResponse, unsubmitResponse } from "$lib/actions";
    import { errors, responseQueue } from "$lib/store";
  
  </script>

  <div>
    <span>
        <hr/>
        <ul>
            {#each $responseQueue as response (response.id)}
                <li>
                    <span>
                        <button class="flex-auto text-white text-left flex flex-col sm:block">
                            <span class="font-normal text-gray-400">{response.type.name} Form</span>
                            {#if response.type.name != "Pit Scouting"}
                            <!-- These two are wrapped in span because on mobile we want to display them on separate lines -->  
                                <span class="sm:ml-5"><span class="font-normal text-gray-400">Match: </span><span class="">{response.match}</span></span>
                            {/if}
                            <!-- Add a space between them on desktop -->
                            <span class="sm:ml-5"><span class="font-normal text-gray-400">Team: </span><span class="">{response.team}</span></span>

                            <!-- The submit and delete buttons -->
                            <span class="flex">
                                <button
                                class="button clickable !px-2 !py-1 !bg-enabled mr-1 !font-normal"
                                on:click={() => deleteResponse(response.id)}>🗑️ Delete</button
                                ><button
                                class="button clickable !px-2 !py-1 !bg-enabled !font-normal"
                                on:click={() => unsubmitResponse(response.id)}>✔ Unsubmit</button
                                >
                            </span>
                            {#if $errors[response.id]}
                                <p>has errors</p>
                            {/if}
                        </button>
                    </span>
                </li>
            {/each}
        </ul>
    </span>
  </div>