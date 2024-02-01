<script>
	import { goto } from '$app/navigation';
import { page } from '$app/stores';
</script>

<div class="text-center">
    {#if $page.error}
        <h1
            class="font-bold text-7xl mb-1 mt-7"
        >{$page.status}</h1>
        <p
            class="text-xl"
        >{$page.error.message}</p>

        <button
            on:click={() => goto("/")}
            class="button clickable mt-5"
        ><span
            class="font-normal"
            >Return to
        </span><span
            class="font-bold"
            >Calvera
        </span>
    </button>
    {/if}
</div>
