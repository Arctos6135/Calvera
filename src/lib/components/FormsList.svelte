<script lang="ts">
    import { goto } from "$app/navigation";

    import { submitResponse, deleteResponse } from "$lib/actions";

    import { activeResponses, errors, response } from "$lib/store";

    const setResponse = (id: number) => {
        $response = id;
        goto("/form");
    };

    
</script>