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
    // Because youre submitting like a mini form with team and match number and stuff
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
                // alliance: $matches[parseInt(match)]?.red_alliance.includes(
                //     parseInt(team)
                // )
                //     ? "RED"
                //     : "BLUE",
                alliance: "BLUE"
            };
            $errors[id] = true;
            match = "";
            team = "";
        } 
    }
    let manual = true;

    $: matchTeams = Object.values($teams).filter(
        (team) =>
            $matches[parseInt(match)]?.red_alliance.includes(team.number) ||
            $matches[parseInt(match)]?.blue_alliance.includes(team.number)
    );

    $: error = team == "" || team == null || (formType.name != "Pit Scouting" && match == "") || (formType.name != "Pit Scouting" && match == null) || $scout == "";
</script>


<div class="space-y-4">
    <div class='flex flex-col'>
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
    <div>
        {#if formType.name != "Pit Scouting"}
            <span class="text-text">Match</span>
            {#if manual}
                <input type="number" bind:value={match} class="rounded-md bg-background text-text border-2">
            {:else}
                <!--Non-manual stuff below-->
                <div class="text-error">Please change to manual</div>
            {/if}
            {#if match == "" || match == null}
                <div class="text-error">Need to choose a match</div>
            {/if}
        {/if}
    </div>
    <div>
        <span class="text-text">Team</span>
        {#if manual}
            <input type="number" bind:value={team} class="rounded-md bg-background text-text border-2">
        {:else}
            <!--Non-manual stuff below-->
            <div class="text-error">Please change to manual</div>
        {/if}
        {#if team == "" || team == null}
            <div class="text-error">Need to choose a team</div>
        {/if}
    </div>
    <div>
        <span class="text-text">Scout name</span>
        <input type="text" bind:value={$scout} class="rounded-md bg-background text-text border-2">
        {#if $scout == ""}
            <div class="text-error">Scout needs a name</div>
        {/if}
    </div>

    <div class="ml-auto">
        <label class="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                class="sr-only peer"
                bind:checked={manual}
            />
            <div
                class="w-[74px] h-[36px] bg-text/50 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[1px] after:left-[1px] peer-checked:after:left-[5px] after:bg-white after:rounded-full after:h-[34px] after:w-[34px] after:transition-all peer-checked:bg-primary focus:outline-none"
            />
            <span class="ml-1 text-text">Manual</span>
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
</div>