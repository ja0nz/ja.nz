<script>
  import "../css/cube.css";
  //import ThemeSwitch from "$lib/components/ThemeSwitch.svelte";
  let tags = ["typescript", "purescript", "nixOS"];
  //let tags = ["typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS", "typescript", "purescript", "nixOS"];
</script>

<svelte:head />

<article class="sidebar | wrapper | mobile-sidebar">
  <div class="menu | sticky-header">
    <div class="box">Profileimage & last seen</div>
    <div>Fuzzy tag search</div>
    <div class="overflow-y-auto">
      {#each tags as tag}
        <div class="box">{tag}</div>
      {/each}
    </div>
  </div>
  <slot />
</article>
