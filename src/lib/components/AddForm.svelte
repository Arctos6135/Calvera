<script lang="ts">
    import { activeResponses, teams, matches, scout, errors } from "$lib/store";
    import { randomID } from "$lib/id";

    let team = "";
    let match = "";
    let formType = "";

    //This is called onFormSubmit but its really for creating a form
    //Because youre submitting like a mini form with team and match number and stuff
    function onFormSubmit() {
        if (!error) {
        //assigns it an ID and puts it in activeResponses
            const id = randomID();
            $activeResponses[id] = {
            //data is an array of components by their IDs
            //All this might need to change to deal with different types of forms
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

<!--Someone needs to CSS this-->
<div>
    <div>
        <span>Form Type</span>
        <select bind:value={formType}>
            <option value="BSForm">Scouting</option>
            <option value="SSForm">Super Scouting</option>
            <option value="PSForm">Pit Scouting</option>
        </select>
    </div>
    {#if formType != "PSForm"}
        <div>
            <span>Match</span>
            {#if manual}
                <input type="number" bind:value={match}/>
            {:else}
                <select bind:value={match}>
                    {#each Object.values($matches) as match (match.number)}
                        <option value={match.number}>{match.number}</option>
                    {/each}
                </select>
            {/if}
            {#if match == "" || match == null}
                <div>Need to choose a match</div>
            {/if}
        </div>
    {/if}
    <div>
        <span>Team</span>
        {#if manual}
            <input type="number" bind:value={team}/>
        {:else}
            <select bind:value={team}>
                {#each matchTeams as team (team.number)}
                    <option value={team.number}>{team.number}</option>
                {/each}
            </select>
        {/if}
        {#if team == "" || team == null}
            <div>Need to choose a team</div>
        {/if}
    </div>
    <div>
        <span>Scout name</span>
        <input type="text" bind:value={$scout}/>
        {#if $scout == ""}
            <div>Scout needs a name</div>
        {/if}
    </div>
    <div>
        <button disabled={error} on:click={onFormSubmit}>Create</button>
    </div>
    <div>
        <span>Manual</span>
        <input type="checkbox" value="" bind:checked={manual}/>
    </div>
</div>