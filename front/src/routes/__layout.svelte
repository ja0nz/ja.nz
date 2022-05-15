<script>
  import "../css/cube.css";
  import { browser, dev } from "$app/env";
  import { theme } from "$lib/stores";

  if (browser) {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.set(darkMode ? "dark light" : "light dark")
  }
</script>

<svelte:head>
  <meta name="color-scheme" content={$theme} />
</svelte:head>

<main class="wrapper">
  <slot />
  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</main>
