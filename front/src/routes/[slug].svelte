<script context="module">
  import { browser } from "$app/env";
  import { urlAll, getMDContent } from "$lib/api";
  import { transduce, last } from "@thi.ng/transducers";

  export const hydrate = true;
  export const prerender = true;
  export const router = browser;

  /** @type {import('./[slug]').Load} */
  export async function load({ params, fetch, session, stuff }) {
    const slug = params.slug;
    const response = await fetch(urlAll());
    // TODO Early exit
    if (!Number(slug)) return { status: response.status };

    const json = response.ok ? await response.json() : [];
    const post = transduce(getMDContent(slug), last(), json);
    console.log(post)

    return {
      status: response.status,
    };
  }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>
