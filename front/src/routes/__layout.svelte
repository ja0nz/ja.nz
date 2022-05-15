<script>
  import "../css/cube.css";
  import ThemeSwitch from "$lib/components/ThemeSwitch.svelte";
</script>

<svelte:head />

<main class="wrapper">
  <ThemeSwitch />
  <slot />
  <footer>
    <p>
      visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
    </p>
  </footer>
</main>
