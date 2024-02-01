<script>
    import "../app.css";
    import logo from "$lib/assets/arctos6135.png";
	import { goto } from "$app/navigation";

    const returnHome = () => {
        goto("/");
    }
</script>

<nav
    class="w-screen drop-shadow-nav h-min bg-primary px-3 py-2 grid grid-cols-3 grid-rows-1 mb-2"
    >
    <button 
        on:click={returnHome}
        ><img
            src={logo}
            alt="Arctos logo"
            class="h-10"
        />
    </button>
    <button 
        class="text-white text-3xl font-bold text-center"
        on:click={returnHome}
        >Calvera
    </button>
</nav>
<main class="bg-background px-4">
    <slot />
</main>