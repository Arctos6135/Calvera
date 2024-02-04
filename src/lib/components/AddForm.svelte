<script lang="ts">
    import { activeResponses, teams, matches, scout, errors } from "$lib/store";
    import { randomID } from "$lib/id";
	import Dropdown from "./FormFlow/Dropdown.svelte";
	import { defaultValidator, numericValidator } from "$lib/validators";
	import Checkbox from "./FormFlow/Checkbox.svelte";

    let team = "";
    let match = "";
    let formType = "";

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
    $: error =
        team == "" || team == null || match == "" || match == null || $scout == "";
</script>


<div>
    <Dropdown bind:choice={formType} label="Form Type" 
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
    <div>
        <Dropdown bind:choice={team} label="Team"
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
    </div>
    <div>
        <!-- Using the dropdown as an input field because too lazy to code it rn :) -->
        <Dropdown bind:choice={$scout} label="Scout Name"
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
    </div>
    <Checkbox bind:enabled={manual} label="Manual" 
        component={ {
            type: "Checkbox",
            id: "Manual",
        } }
    />
    <div class="flex px-20 mt-3">
        <button class="button clickable flex-auto" disabled={error} on:click={onFormSubmit}>Create</button>
    </div>
</div>