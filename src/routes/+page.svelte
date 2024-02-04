<script lang="ts">
    import AddForm from "$lib/components/AddForm.svelte";
	import Checkbox from "$lib/components/FormFlow/Checkbox.svelte";
	import Counter from "$lib/components/FormFlow/Counter.svelte";
	import Dropdown from "$lib/components/FormFlow/Dropdown.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
    import ResponseList from "$lib/components/ResponseList.svelte";
	import { matches } from "$lib/store";
	import { onMount } from "svelte";

    let choice = "a";
    let manual = false;
    const validator = (choice: string) => {
        if (choice.trim().length == 0) {
            return "Choice cannot be empty!";
        }
        
        return undefined;
    }

    let enabled = false;
</script>

<div>
    <!-- This is just some code to test the components -->
    
    <!-- <div>Current choice: {choice}</div>
    <div>Checkbox is currently {enabled ? "enabled" : "disabled"}</div>
    <button on:click={() => {manual = !manual;}}>Manual</button>

    <Counter label="Something very long" component={ { id: "10", type: "Counter" } } />
    <Dropdown label="My very long dropdown" bind:choice={choice} component={ { id: "11", type:"Dropdown", options: ['a', 'b', 'c'], validator, manual } }/>
    <Checkbox label="My checkbox" bind:enabled={enabled} component={ { type: "Checkbox", id:"12" } }/> -->

    <FormsList/>
    <div>
        <AddForm/>
    </div>
    <ResponseList/>
</div>