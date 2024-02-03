<script lang="ts">
    import type { Checkbox } from "$lib/types";

    export let label = "Checkbox";
    export let component: Checkbox;
    export let enabled = component.initialValue ?? false;
</script>

<div class="flex justify-between items-center">
    <span
        class="text-xl min-w-max"
    >{label}</span>

    <!-- Using a button instead of an input field because styling regular checkboxes is a pain -->
    <button
       on:click={() => {enabled = !enabled}} 
       class="button clickable !px-2 !py-1.5 border-box border-3"
       class:!bg-enabled={enabled}
       class:border-enabled={!enabled}
       class:border-primary={enabled}
        >

        <!-- Only display the checkbox if it is enabled. This method ensures that the size of button never changes! -->
        <span
            class:opacity-0={!enabled}
        >✔</span>
    </button>
</div>