<script context="module" lang="ts">
  import type { LoadEvent } from "@sveltejs/kit";
  import type { ParsedIssue } from "src/app";
  import { dev } from "$app/env";
  import { integer } from "$lib/dev/browser";
  import { get } from "svelte/store";
  import { numberP, titleP } from "$lib/paths";
  export async function load({ params, url, fetch, stuff }: LoadEvent) {
    const num = get<ParsedIssue[]>(stuff.ALL)
      .filter((x) => titleP(x).startsWith(`#${params.slug}`))
      .map(numberP);

    const api = `https://api-ja-nz.janz.workers.dev/v1/parsed/issue/${
      num.length ? num[0] : 0
    }`;
    const response = dev ? integer.clone() : await fetch(api);
    if (!response.ok) return { status: 500 };
    const fetchedContent: ParsedIssue[] = await response.json();
    if (!fetchedContent.length) return { status: 404 };

    return {
      status: response.status,
      props: {
        issue: fetchedContent[0],
      },
    };
  }
</script>

<script lang="ts">
  export let issue: ParsedIssue;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<article>
  {@html issue.body}
</article>
