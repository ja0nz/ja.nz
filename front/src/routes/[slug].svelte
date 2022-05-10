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
    if (!Number(slug)) return { status: 404 };
    const response = await fetch(urlAll());
    const allJson = response.ok ? await response.json() : [];
    const json = transduce(getMDContent(slug), last(), allJson);

    return {
      status: response.status,
      props: {
        json,
      },
    };
  }
</script>

<script>
  /** @type {import('$lib/bindings').IssueFM} */
  export let json;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<article>
  {@html json.body}
</article>
