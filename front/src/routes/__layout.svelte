<script context="module" lang="ts">
  import { fetchApi } from "$lib/fetch";
  import type { LoadInput } from "@sveltejs/kit";
  export async function load({ fetch }: LoadInput) {
    try {
      return {
        stuff: {
          // content
          ALL: await fetchApi(fetch),
        },
      };
    } catch (error: any) {
      return { status: 500 };
    }
  }
</script>

<script>
  import "../css/cube.css";
</script>

<svelte:head />

<a class="[ skip-link ] [ button ]" href="#main-content">Goto main</a>
<main tabindex="-1" style="padding: 0;" class="wrapper">
  <slot />
</main>
