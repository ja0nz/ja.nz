<script context="module" lang="ts">
  import type { LoadInput } from "@sveltejs/kit";
  import type { ParsedIssue, SlugOutput } from "src/app";
  export async function load({
    params,
    fetch,
  }: LoadInput): Promise<SlugOutput> {
    const url = `https://api-ja-nz.janz.workers.dev/v1/parsed/title/${params.slug}`;
    const response = await fetch(url);
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
