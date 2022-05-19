<script context="module" lang="ts">
  import type { LoadInput } from "@sveltejs/kit";
  import type { ParsedIssue, LoadSingle } from "src/app";
  import { dev } from "$app/env";
  import { integer } from "$lib/dev/browser";
  export async function load({
    params,
    fetch,
    url,
  }: LoadInput): Promise<LoadSingle> {
    console.log([...url.searchParams.entries()]);
    const api = `https://api-ja-nz.janz.workers.dev/v1/parsed/title/${params.slug}`;
    const response = dev ? integer.clone() : await fetch(api);
    if (!response.ok) return { status: 500 };
    const [content]: [ParsedIssue] = await response.json();
    if (!content) return { status: 404 };

    return {
      status: response.status,
      props: {
        content,
      },
    };
  }
</script>

<script lang="ts">
  export let content: ParsedIssue;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<article>
  {@html content.body}
</article>
