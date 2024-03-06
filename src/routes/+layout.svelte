<script>
  import "../app.css";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { lastGet, responseQueue } from "$lib/store";
	import { get, append } from "$lib/sheet";

    const returnHome = () => {
        goto("/");
    }

    // couldn't make this work, hopefully not necessary
    // I think its just for image stuff?
    // onMount(async () => {
    // if (pwaInfo) {
    //   const { registerSW } = await import("virtual:pwa-register");
    //   registerSW({
    //     immediate: true,
    //     onRegistered(r) {
    //       r && r.update();
    //       console.log(`SW Registered: ${r}`);
    //     },
    //     onRegisterError(error) {
    //       console.log("SW registration error", error);
    //     },
    //   });
    // }

    if (Date.now() - $lastGet > 60 * 60 * 1000) {
        get();
    }   

    //Sends form to spreadsheet
    function sync() {
      setTimeout(async () => {
        if ($responseQueue.length != 0) {
          const ids = $responseQueue.map((response) => response.id);
          if (await append($responseQueue)) {
            $responseQueue = $responseQueue.filter(
              (response) => !ids.includes(response.id)
            );
          }
        }
        sync();
      }, 6000);
    }
    onMount(() => sync())
</script>

<nav
    class="w-screen drop-shadow-nav h-min bg-primary px-3 py-2 grid grid-cols-3 grid-rows-1 mb-2"
    >
    <button 
        on:click={returnHome}
        >
        <img
            src={"./arctos6135.png"}
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