<script context="module" lang="ts">
  let inputEl: HTMLInputElement;
  const H = "visually-hidden";
  export function toggleSearch() {
    if (inputEl.classList.contains(H)) {
      inputEl.classList.remove(H);
      inputEl.inert = false;
    } else {
      inputEl.classList.add(H);
      inputEl.inert = true;
    }
  }
</script>

<script lang="ts">
  export let contentByTag: ParsedIssue[];

  import type { ParsedIssue } from "src/app";
  import { highlightDOMString } from "$lib/highlightDOM";
  import { filterContent } from "$lib/xform";

  let content: IterableIterator<ParsedIssue>;
  let fuzzyContent = "";
  $: content = filterContent(
    fuzzyContent,
    { key: (x: ParsedIssue) => x.body },
    contentByTag
  );
</script>

<input
  aria-label="Search message feed"
  class="visually-hidden"
  type="text"
  bind:this={inputEl}
  bind:value={fuzzyContent}
  placeholder="Search feed"
  inert
/>
<div style="scroll-margin-top: 64px;" id="main-content" class="box">
  {#each [...content] as { body }}
    <div class="box">
      {@html highlightDOMString(
        body,
        fuzzyContent,
        (token) => `<span class="underline">${token}</span>`
      )}
    </div>
  {/each}
</div>

<style>
 input {
     width: 100%;
 }
</style>
