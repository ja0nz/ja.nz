<script context="module" lang="ts">
  import { fetchApi } from "$lib/fetch";
  import type { LoadEvent } from "@sveltejs/kit";
  export async function load({ fetch }: LoadEvent) {
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
  import SkipLink from "../css/blocks/skip-link.svelte";
  import "../css/cube.css";
</script>

<svelte:head />

<SkipLink />
<main tabindex="-1" style="padding: 0;" class="wrapper">
  <slot />
</main>

<style>
  main {
    margin-block-start: var(--margin-top);
  }
</style>
