<script lang="ts">
    import { activeResponses, teams, matches, scout, errors } from "$lib/store";
    import { randomID } from "$lib/id";
	import Dropdown from "./FormFlow/Dropdown.svelte";
	import { defaultValidator, numericValidator } from "$lib/validators";
	import Checkbox from "./FormFlow/Checkbox.svelte";

    let team = "";
    let match = "";
    let formType = "";

    let error: boolean = false;
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
            type: formType,
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
        || (formType != "Pit Scouting" && errorMatch !== undefined);
</script>


<div>
    <Dropdown bind:choice={formType} label="Form Type" 
        bind:error={errorFormType}
        component={ { 
            type: "Dropdown", 
            id: "Form Type",
            options: ["Scouting", "Super Scouting", "Pit Scouting"], 

            /**
             * This just uses the default validator and overrides
             * the message when the choice is empty.
             * @param val
             */
            validator: (val) => {
                const result = defaultValidator(val);

                if (result != undefined) {
                    return "Must choose a form type";
                }

                return undefined;
            },
        } }
    />

    {#if formType != "Pit Scouting"}
        <Dropdown bind:choice={match} label="Match"
            bind:error={errorMatch}
            component={ {
                type: "Dropdown",
                id: "Match",
                manual,
                // Convert the matches array into an array of strings.
                options: Object.values($matches).map((match) => match.number.toString()),

                // Customize the error message
                validator: (val) => {
                    const notEmpty = defaultValidator(val);
                    if (notEmpty != undefined) {
                        return "Must choose a match";
                    }

                    const isNumeric = numericValidator(val);
                    if (isNumeric != undefined) {
                        return "Must be a valid match";
                    }

                    return undefined;
                },
            } }
        />
    {/if}

    <Dropdown bind:choice={team} label="Team"
        bind:error={errorTeam}
        component={ {
            type: "Dropdown",
            id: "Team",
            manual,
            // Convert the teams array into an array of strings.
            options: matchTeams.map((team) => team.number.toString()),

            // Customize the error message
            validator: (val) => {
                const notEmpty = defaultValidator(val);
                if (notEmpty != undefined) {
                    return "Must choose a team";
                }

                const isNumeric = numericValidator(val);
                if (isNumeric != undefined) {
                    return "Must be a valid team";
                }

                return undefined;
            },
        } }
    />

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

    <Checkbox bind:checked={manual} label="Manual" 
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