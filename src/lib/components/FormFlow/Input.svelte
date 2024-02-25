<script lang="ts">
	import type { Input } from "$lib/types";
	import Checkbox from "./Checkbox.svelte";
	import Counter from "./Counter.svelte";
	import Dropdown from "./Dropdown.svelte";
	import Textbox from "./Textbox.svelte";

    export let group: Input;

    let component = group.component as never;

    let components = {
        "Dropdown": Dropdown,
        "Checkbox": Checkbox,
        "Counter": Counter,
        "Textbox": Textbox,
    };

    let Component = components[group.component.type];
    export let error: string | undefined;
</script>
<div>
    <span>{group.label}</span>
    <Component {component} bind:error/>
</div>
