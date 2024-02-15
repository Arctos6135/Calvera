<script lang="ts">
    import { activeResponses, teams, matches, scout, errors } from "$lib/store";
    import { randomID } from "$lib/id";
	import Dropdown from "./FormFlow/Dropdown.svelte";
	import { defaultValidator, numericValidator } from "$lib/validators";
	import Checkbox from "./FormFlow/Checkbox.svelte";
    import { formTypes } from "$lib/formLayout";

    let team = "";
    let match = "";
    let formType = formTypes[0];

    let errorFormType: string | undefined = undefined;
    let errorMatch: string | undefined = undefined;
    let errorTeam: string | undefined = undefined;
    let errorScoutName: string | undefined = undefined;

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
            //Maybe switch this to the actual type?
            type: formType.name,
            id: id,
            scout: $scout,
            team: parseInt(team),
            match: parseFloat(match),
            alliance: $matches[parseInt(match)]?.red_alliance.includes(
                parseInt(team)
            )
                ? "RED"
                : "BLUE",
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

    $: error = errorFormType !== undefined 
        || errorTeam !== undefined 
        || errorScoutName !== undefined
        || (formType.name != "Pit Scouting" && errorMatch !== undefined);
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
    

    <!-- Using the dropdown as an input field because too lazy to code it rn :) -->
    <Dropdown bind:choice={$scout} label="Scout Name"
        bind:error={errorScoutName}
        component={ {
            type: "Dropdown",
            id: "Scout Name",
            manual: true,
            options: [],

            // Customize the error message
            validator: (val) => {
                const notEmpty = defaultValidator(val);
                if (notEmpty != undefined) {
                    return "Must have a scout name";
                }

                return undefined;
            },
        } }
    />

    <Checkbox bind:enabled={manual} label="Manual" 
        component={ {
            type: "Checkbox",
            id: "Manual",
        } }
    />

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