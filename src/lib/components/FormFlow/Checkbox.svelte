<script lang="ts">
	import { activeResponses } from "$lib/store";
    import type { Checkbox } from "$lib/types";
	import { getContext } from "svelte";

    export const id: number = getContext("id")

    $: if ($activeResponses[id].data[component.id] === undefined) {
        $activeResponses[id].data[component.id] = component.initialValue ?? 0;
    }

    export let component: Checkbox;
    export const error: string | undefined = undefined;
    $: checked = $activeResponses[id].data[component.id] == 1
</script>

<div class="inline-flex justify-between items-center my-2">

    <!-- Using a button instead of an input field because styling regular checkboxes is a pain -->
    <button
        on:click={() => {$activeResponses[id].data[component.id] = checked ? 0 : 1}} 
        class="button clickable !px-2 !py-1.5 border-box border-3"
        class:!bg-enabled={checked}
        class:border-enabled={!checked}
        class:border-primary={checked}
    >

        <!-- Only display the checkbox if it is enabled. This method ensures that the size of button never changes! -->
        <span
            class:opacity-0={!checked}
        >✔</span>
    </button>
</div>