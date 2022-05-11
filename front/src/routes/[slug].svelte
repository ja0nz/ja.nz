<script context="module">
  // TODO set prerender to true in default
  export const prerender = true;
</script>

<script>
  export let content;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<article>
  {@html content?.body}
</article>
