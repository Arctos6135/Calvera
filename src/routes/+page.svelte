<script lang="ts">
    import AddForm from "$lib/components/AddForm.svelte";
	import Checkbox from "$lib/components/FormFlow/Checkbox.svelte";
	import Counter from "$lib/components/FormFlow/Counter.svelte";
	import Dropdown from "$lib/components/FormFlow/Dropdown.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
    import ResponseList from "$lib/components/ResponseList.svelte";

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
    

    <FormsList/>
    <div>
        <AddForm/>
    </div>
    <ResponseList/>
</div>