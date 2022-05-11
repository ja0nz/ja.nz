<script context="module">
  // TODO set prerender to true in default
  export const prerender = true;

  /** @type {import('./[slug]').Load} */
  export async function load({ params, fetch, session, stuff }) {
    const url = `https://api.ja.nz/v1/issues`;
    const slug = params.slug;
    if (!Number(slug)) return { status: 404 };
    const response = await fetch(url);
    const json = response.ok ? await response.json() : [];
    //const json = allJson.filter((x) => x.title.startsWith(`#${slug}`))

    return {
      status: response.status,
      props: {
        json,
        slug,
      },
    };
  }
</script>

<script>
  import { getMDContent } from "$lib/api";
  import { transduce, last } from "@thi.ng/transducers";
  /** @type {import('$lib/bindings').IssueFM} */
  export let json, slug;

  const content = transduce(getMDContent(slug), last(), json);
  export { content };
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<article>
  {@html content?.body}
</article>
