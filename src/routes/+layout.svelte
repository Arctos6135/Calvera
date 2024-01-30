<script>
    import "../app.css";
    import logo from "$lib/assets/arctos6135.png";
</script>

<nav 
    class="w-screen drop-shadow-nav h-min bg-primary px-3 py-2 grid grid-cols-3 grid-rows-1 mb-2"
    >
    <img
        src={logo}
        alt="Arctos logo"
        class="h-10"
    />
    <h1 class="text-white text-3xl font-bold text-center">
        Calvera
    </h1>
</nav>
<main class="bg-background px-4">
    <slot />
</main>