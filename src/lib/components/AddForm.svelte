<script lang="ts">
    import { activeResponses, teams, matches, scout, errors, manualSubmission } from "$lib/store";
    import { randomID } from "$lib/id";
	import Checkbox from "./FormFlow/Checkbox.svelte";
    import { formTypes } from "$lib/formLayout";
	import type { FormType } from "$lib/types";
	import { setResponse } from "$lib/actions";

    let team = "";
    let match = "";
    let formType: FormType = formTypes[0];

    let error: boolean;

    // This is called onFormSubmit but its really for creating a form
    // Because you're submitting like a mini form with team and match number and stuff
    function onFormSubmit() {
        if (!error) {
            // assigns it an ID and puts it in activeResponses
            const id = randomID();
            $activeResponses[id] = {
                // data is an array of components by their IDs
                // All this might need to change to deal with different types of forms
                data: {},
                type: formType,
                id: id,
                scout: $scout,
                team: parseInt(team),
                match: (formType.name == "Pit Scouting") ? null : parseInt(match),
                alliance: $matches[parseInt(match)]?.red_alliance.includes(parseInt(team)) 
                    ? "RED"
                    : ($matches[parseInt(match)]?.blue_alliance.includes(parseInt(team)) 
                        ? "BLUE" 
                        : "ERR")
            };
            // console.log(`match: ${match}`)
            // console.log(`matches[match]: ${$matches[parseInt(match)]}`)
            // console.log(`red: ${$matches[parseInt(match)]?.red_alliance}`)
            // console.log(`Blue: ${$matches[parseInt(match)]?.red_alliance}`)
            $errors[id] = true;
            match = "";
            team = "";
            
            setResponse(id);
        } 
    }

    $: matchTeams = Object.values($teams).filter(
        (team) =>
            $matches[parseInt(match)]?.red_alliance.includes(team.number) ||
            $matches[parseInt(match)]?.blue_alliance.includes(team.number)
    );

    $: error = team == "" || team == null || (formType.name != "Pit Scouting" && match == "") || (formType.name != "Pit Scouting" && match == null) || $scout == "";
</script>


<div class="space-y-4">
    <div class="text-2xl text-text block font-bold text-center">Create Form</div>
    <hr class="text-text/50 mb-2" style="margin-top: 8px" />

    <div class="my-2">
        <div class="sm:flex justify-between items-center gap-2">
            <span
                class="text-xl min-w-max"
            >Form Type</span>

            <span
                class="flex sm:inline mt-1 sm:mt-0">
                <!-- Display the dropdown menu if manual is false -->
                <select
                    bind:value={formType}
                    class="transition-all flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
                >
                    {#each formTypes as formType}
                        <option
                            class="cursor-pointer"
                            value={formType}
                        >{formType.name}</option>
                    {/each}
                </select>
            </span>
        </div>

        {#if formType == null}
            <div class="text-red-700 text-md font-bold w-max ml-[auto]">Need to choose a form type</div>
        {/if}
    </div>

    {#if formType.name != "Pit Scouting"}
        <div class="my-2">
            <div class="sm:flex justify-between items-center gap-2">
                <span
                    class="text-xl min-w-max"
                >Match</span>

                <span
                    class="flex sm:inline mt-1 sm:mt-0">
                <!-- Display the dropdown menu if manual is false -->
                    {#if !$manualSubmission}
                        <select
                            bind:value={match}
                            class="transition-all flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
                        >
                            {#each Object.values($matches) as match}
                                <option
                                    class="cursor-pointer"
                                    value={match.number}
                                >{match.number}</option>
                            {/each}

                            <!-- Testing Options -->
                            <!-- <option
                                class="cursor-pointer"
                                value={1}
                            >{1}</option>

                            <option
                                class="cursor-pointer"
                                value={2}
                            >{2}</option> -->
                        </select>
                    {:else}
                    
                        <!-- Display a text input field if manual is true -->
                        <input
                            type="text"
                            bind:value={match}
                            class="flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
                        />
                    {/if}
                </span>
            </div>
        
            {#if match == "" || match == null}
                <div class="text-red-700 text-md font-bold w-max ml-[auto]">Need to choose a match</div>
            {/if}
        </div>
    {/if}

    <div class="my-2">
        <div class="sm:flex justify-between items-center gap-2">
            <span
                class="text-xl min-w-max"
            >Team</span>

            <!-- The following if statements ensure that the 
                team dropdown is only displayed if manual is 
                enabled or a match is selected
            -->
            {#if (match == "" || match == null) && !$manualSubmission && formType.name != "Pit Scouting"}
                <div class="text-red-700 text-md font-bold w-max ml-[auto] inline float-right">Must choose a match first</div>
            {:else}
                <span
                    class="flex sm:inline mt-1 sm:mt-0">
                <!-- Display the dropdown menu if manual is false -->
                    {#if !$manualSubmission}
                        <select
                            bind:value={team}
                            class="transition-all flex-auto sm:inline bg-primary w-80 md:w-96 min-w-max rounded-xl px-4 py-2 text-white remove-arrow cursor-pointer hover:bg-hover hover:drop-shadow-btn-hover"
                        >
                            {#each matchTeams as team}
                                <option
                                    class="cursor-pointer"
                                    value={team.number}
                                >{team.number}</option>
                            {/each}
                            <!-- Testing Options -->
                            <!-- <option
                                class="cursor-pointer"
                                value={6135}
                            >{6135}</option>
                            <option
                                class="cursor-pointer"
                                value={1310}
                            >{1310}</option> -->
                        </select>
                    {:else}
                    
                        <!-- Display a text input field if manual is true -->
                        <input
                            type="text"
                            bind:value={team}
                            class="flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
                        />
                    {/if}
                </span>
            {/if}
        </div>
    
        {#if (team == "" || team == null) && ($manualSubmission || (match != "" && match != null))}
            <div class="text-red-700 text-md font-bold w-max ml-[auto]">Need to choose a team</div>
        {/if}
    </div>

    <div class="my-2">
        <div class="sm:flex justify-between items-center gap-2">
            <span
                class="text-xl min-w-max"
            >Scout Name</span>

            <span
                class="flex sm:inline mt-1 sm:mt-0">
            <!-- Display the dropdown menu if manual is false -->
                <input
                    type="text"
                    bind:value={$scout}
                    class="transition-all flex-auto sm:inline bg-primary w-80 md:w-96 rounded-xl px-4 py-2 text-white remove-arrow focus:drop-shadow-btn-hover min-w-9"
                />
            </span>
        </div>
    
        {#if $scout == ""}
            <div class="text-red-700 text-md font-bold w-max ml-[auto]">Scout needs a name</div>
        {/if}
    </div>

    <div class="ml-auto">
        <label class="inline items-center cursor-pointer">
            <div class="relative flex justify-between items-center gap-2">
                <span
                    class="text-xl min-w-max"
                >Manual</span>
                
                <span>
                    <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        bind:checked={$manualSubmission}
                    />
                    <div
                        class="w-[64px] h-[32px] bg-hover/50 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[1px] after:bg-white after:rounded-full after:h-[32px] after:w-[32px] after:transition-all peer-checked:bg-enabled focus:outline-none"
                    />
                </span>
            </div>
        </label>
    </div>

    <div class="flex px-20 mt-3">
        <button 
            class="button flex-auto mb-5"
            class:clickable={!error}
            class:!bg-disabled={error}
            class:!text-gray-500={error}
            class:!font-normal={error}
            disabled={error}
            on:click={onFormSubmit}
        >Create</button>
    </div>
</div>