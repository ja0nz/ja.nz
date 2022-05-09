<script context="module">
  import { browser } from "$app/env";
  import grayMatter from "gray-matter";
  import { comp, transduce, last, filter, map } from "@thi.ng/transducers";
  import { compile } from "mdsvex";

  export const hydrate = true;
  export const prerender = true;
  export const router = browser;
  const url = `https://api.ja.nz/v1/issues`;

  /** @param {string} slug */
  const xform = (slug) =>
    comp(
      // filter post
      filter((x) => x.title.startsWith(`#${slug}`)),
      // map to gray matter
      map((x) => ({ ...x, body: grayMatter(x.body) }))
    );

  /** @type {import('./[slug]').Load} */
  export async function load({ params, fetch, session, stuff }) {
    const slug = params.slug;
    const response = await fetch(url);
    // TODO Early exit
    if (!Number(slug) || browser) return { status: response.status };
    const json = response.ok ? await response.json() : [];
    const post = transduce(xform(slug), last(), json);
    console.log(post);

    return {
      status: response.status,
    };
  }
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>
