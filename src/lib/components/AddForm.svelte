<script lang="ts">
    import { activeResponses, teams, matches, scout, errors } from "$lib/store";
    import { randomID } from "$lib/id";
	import Checkbox from "./FormFlow/Checkbox.svelte";
    import { formTypes } from "$lib/formLayout";
	import type { FormType } from "$lib/types";

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
        } 
    }
    let manual = false;

    $: matchTeams = Object.values($teams).filter(
        (team) =>
            $matches[parseInt(match)]?.red_alliance.includes(team.number) ||
            $matches[parseInt(match)]?.blue_alliance.includes(team.number)
    );

    $: error = team == "" || team == null || (formType.name != "Pit Scouting" && match == "") || (formType.name != "Pit Scouting" && match == null) || $scout == "";
</script>


<div class="space-y-4">
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
                    {#if !manual}
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

                            <option
                                class="cursor-pointer"
                                value={1}
                            >{1}</option>

                            <option
                                class="cursor-pointer"
                                value={2}
                            >{2}</option>
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
            {#if (match == "" || match == null) && !manual}
                <div class="text-red-700 text-md font-bold w-max ml-[auto]">Choose a match first</div>
            {:else}
                <span
                    class="flex sm:inline mt-1 sm:mt-0">
                <!-- Display the dropdown menu if manual is false -->
                    {#if !manual}
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
                            <option
                                class="cursor-pointer"
                                value={6135}
                            >{6135}</option>
                            <option
                                class="cursor-pointer"
                                value={1310}
                            >{1310}</option>
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
    
        {#if (team == "" || team == null) && (manual || (match != "" && match != null))}
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
                        bind:checked={manual}
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
            class="button flex-auto"
            class:clickable={!error}
            class:!bg-disabled={error}
            class:!text-gray-500={error}
            class:!font-normal={error}
            disabled={error}
            on:click={onFormSubmit}
        >Create</button>
    </div>

    <!-- The following divs have all been replaced by a newer design -->
    <div class="hidden">
        <div class='flex-col hidden'>
            <span class='text-text'>Form Type</span>
            <select bind:value={formType} class="rounded-md bg-background text-text border-2">
                {#each formTypes as formType}
                    <option value={formType}>{formType.name}</option>
                {/each}
            </select>
            {#if formType == null}
                <div class="text-error">Need to choose a form type</div>
            {/if}
        </div>

        <div class="hidden">
            {#if formType.name != "Pit Scouting"}
                <span class="text-text">Match</span>
                {#if manual}
                    <input type="number" bind:value={match} class="rounded-md bg-background text-text border-2">
                {:else}
                    <!--Non-manual stuff below-->
                    <select bind:value={match} class="rounded-md bg-background text-text border-2">
                        {#each Object.values($matches) as match}
                            <option value={match.number}>{match.number}</option>
                        {/each}
                    </select>
                {/if}
                {#if match == "" || match == null}
                    <div class="text-error">Need to choose a match</div>
                {/if}
            {/if}
        </div>

        <div class="hidden">
            <span class="text-text">Team</span>
            {#if manual}
                <input type="number" bind:value={team} class="rounded-md bg-background text-text border-2">
            {:else}
                <!--Non-manual stuff below-->
                <select bind:value={team} class="rounded-md bg-background text-text border-2">
                    {#each matchTeams as team}
                        <option value={team.number}>{team.number}</option>
                    {/each}
                </select>
            {/if}
            {#if team == "" || team == null}
                <div class="text-error">Need to choose a team</div>
            {/if}
        </div>

        <div class="hidden">
            <span class="text-text">Scout name</span>
            <input type="text" bind:value={$scout} class="rounded-md bg-background text-text border-2">
            {#if $scout == ""}
                <div class="text-error">Scout needs a name</div>
            {/if}
        </div>
    </div>
</div>