<!-- A background that sticks behind the content
     Variables:
       --top-placement -> this
     Usage:
     - sticks background
     - if there is a #main-content
-->
<script lang="ts">
  export let bg: string;
</script>

<div class="this">
  <div class="overflow-x-hidden">
    <slot />
  </div>
  <div style="background: url('{bg}')" class="background" />
</div>

<style>
  .this {
    display: grid;
    /* CSS grid blowout fix*/
    grid-template-columns: minmax(0, 100%);
    > * {
      grid-area: 1 / 1;
    }
  }
  .background {
    align-self: start;
    height: calc(100vh - var(--top-placement) - 1px);
    position: sticky;
    z-index: -1;
    top: var(--top-placement);
  }
</style>
