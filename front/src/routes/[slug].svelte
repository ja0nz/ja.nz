<script context="module" lang="ts">
  import type { LoadInput } from "@sveltejs/kit";
  import type { ParsedIssue, SlugOutput } from "src/app";
  export const prerender = true;
  const url = (id: string) => `https://api.ja.nz/v1/parsed/title/${id}`;
  export async function load({
    params,
    fetch,
  }: LoadInput): Promise<SlugOutput> {
    const slug = params.slug;
    if (!Number(slug)) return { status: 404 };
    const response = await fetch(url(slug));
    if (!response.ok) return { status: 500 };
    const [content]: [ParsedIssue] = await response.json();
    if (!content) return { status: 404 }

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
