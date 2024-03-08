<script lang="ts">
    import FormFlow from "$lib/components/FormFlow/index.svelte";
    import AddForm from "$lib/components/AddForm.svelte";
	import Checkbox from "$lib/components/FormFlow/Checkbox.svelte";
	import Counter from "$lib/components/FormFlow/Counter.svelte";
	import Dropdown from "$lib/components/FormFlow/Dropdown.svelte";
	import Textbox from "$lib/components/FormFlow/Textbox.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
    import ResponseList from "$lib/components/ResponseList.svelte";
	import { matches, response, activeResponses } from "$lib/store";
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
    <FormsList/>
    <div>
        <AddForm/>
    </div>
    <ResponseList/>
</div>