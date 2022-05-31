<script lang="ts">
  export let route: string;
</script>

<a href={route} class="this">
  <slot name="picture" />
  <slot name="text" />
</a>

<style>
  .this {
    display: grid;
    align-items: center;
    /* first col defines size of avatar */
    grid-template-columns: 64px max-content;
    grid-gap: var(--space-xs);
    /* Padding around card */
    padding: var(--space-2xs);
    /* cursor: pointer; */
  }
  .this:hover {
    background-color: yellow;
  }
  .this :global([slot="picture"] > img) {
    border-radius: 50%;
  }
  .this :global([slot="text"] > :last-child) {
    font-size: var(--step--1);
  }
  .this :global([slot="text"] > :first-child) {
    font-size: var(--step-0);
  }
</style>
