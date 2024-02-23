<script lang="ts">
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import AddForm from "$lib/components/AddForm.svelte";
	import Checkbox from "$lib/components/FormFlow/Checkbox.svelte";
	import Counter from "$lib/components/FormFlow/Counter.svelte";
	import Dropdown from "$lib/components/FormFlow/Dropdown.svelte";
	import Textbox from "$lib/components/FormFlow/Textbox.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
    import ResponseList from "$lib/components/ResponseList.svelte";
	import { matches } from "$lib/store";
	import { onMount } from "svelte";
    import { BSForm, PSForm, SSForm } from "$lib/formLayout";
    import { goto } from "$app/navigation"

    let choice = "a";
    let manual = false;
    const validator = (choice: string) => {
        if (choice.trim().length == 0) {
            return "Choice cannot be empty!";
        }
        
        return undefined;
    }

    let enabled = false;

    let content: string;
</script>

<div class="md:max-w-[600px] mx-auto">
    <!-- This is just some code to test the components -->
    
    <!-- <div>Current choice: {choice}</div>
    <div>Checkbox is currently {enabled ? "enabled" : "disabled"}</div>
    <button on:click={() => {manual = !manual;}}>Manual</button> -->

    <!-- <div>The textbox says: {content}</div>
    <Textbox label="An epic textbox" component={ { type: "Textbox", id: "13", maxLength: 10 } } bind:content />
    <Counter label="An epic counter" component={ { id: "10", type: "Counter" } } /> -->

    <!-- <Dropdown label="My very long dropdown" bind:choice={choice} component={ { id: "11", type:"Dropdown", options: ['a', 'b', 'c'], validator, manual } }/>
    <Checkbox label="My checkbox" bind:enabled={enabled} component={ { type: "Checkbox", id:"12" } }/> -->

    <!-- <FormFlow formType={PSForm}></FormFlow> -->

    <FormsList/>
    <div>
        <AddForm/>
    </div>
    <ResponseList/>
</div>

<button on:click={() => goto("/test")} >Test</button>