<script lang="ts">
  import type { Fn0 } from "@thi.ng/api";
  export let action: Fn0<void>;
  const a100 = "anicons100";
  let el: HTMLDivElement;
  export function actionAndIcon() {
    if (el.classList.contains(a100)) {
      el.classList.remove(a100);
    } else {
      el.classList.add(a100);
    }
    action();
  }
</script>

<div class="icon" bind:this={el} on:click={actionAndIcon}>9</div>

<style>
  :global(.anicons100) {
    font-variation-settings: "TIME" 100 !important;
  }
  .icon {
    cursor: pointer;
    opacity: 50%;
    font-family: "Anicons";
    font-size: var(--step-2);
    font-variation-settings: "TIME" 1;
    transition: font-variation-settings 0.4s ease;
  }
</style>
