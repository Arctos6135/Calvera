<script lang="ts">
	import type { Component, Input } from "$lib/types";
	import Checkbox from "./Checkbox.svelte";
	import Counter from "./Counter.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Textbox from "./Textbox.svelte";

    export let group: Input;
    let label = group.label;

    let choice: string;
    let component = group.component as never;

    let components = {
        "Dropdown": Dropdown,
        "Checkbox": Checkbox,
        "Counter": Counter,
        "Textbox": Textbox,
    };

    let Component = components[group.component.type];
</script>

<Component component={component} bind:choice {label} />