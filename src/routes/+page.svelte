<script lang="ts">
    import AddForm from "$lib/components/AddForm.svelte";
	import Counter from "$lib/components/FormFlow/Counter.svelte";
    import FormsList from "$lib/components/FormsList.svelte";
    import ResponseList from "$lib/components/ResponseList.svelte";
</script>

<div>
    <FormsList/>
    <div>
        <AddForm/>
    </div>
    <ResponseList/>
</div>