<script context="module" lang="ts">
  // Pass the `stuff` from __layout into the props of this page
  export async function load({ params, url, stuff }: LoadInput) {
    const content = stuff.ALL;
    const tag = params.slug;
    console.log(tag);
    // TODO
    const anchor = url.searchParams;
    return { props: stuff };
  }
</script>

<script lang="ts">
  import type { ParsedIssue } from "src/app";
  import { highlightTags, latestTags } from "$lib/xform";
  import type { LoadInput } from "@sveltejs/kit";
  import { filterFuzzy } from "@thi.ng/transducers";
  import type { Writable } from "svelte/store";
  export let ALL: Writable<ParsedIssue[]>;

  const tagsAll: [string, number][] = latestTags($ALL);

  // Filter
  let inputEl: HTMLInputElement;
  const focusSearch = (e: KeyboardEvent) => {
    if (e.key === "/" && inputEl) inputEl.select();
  };
  let lT: IterableIterator<[string, number]>;
  let search = "";
  $: lT = filterFuzzy(search, { key: (x: [string, number]) => x[0] }, tagsAll);
  // -- Filter finished
</script>

<svelte:window on:keyup={focusSearch} />

<article class="sidebar | mobile-sidebar">
  <div class="menu | sticky-header">
    <div class="box">Profileimage & last seen</div>
    <input
      aria-label="Search tags"
      type="text"
      bind:value={search}
      bind:this={inputEl}
      placeholder="Hit / to search"
    />
    <div class="overflow-y-auto">
      {#each [...lT] as [tag, ts]}
        <div class="box">{@html highlightTags(tag, search)}</div>
      {/each}
    </div>
  </div>
  <div id="not-sidebar" class="no-contentX">
    <div class="key-header | splitter sticky-header">
      <div class="box">⬅ Topic Card Photo blah</div>
      <aside>
        <a href="/:box">Box</a>
        <div>ThemeSwitch</div>
      </aside>
    </div>
    <div
      style="min-height: 1000px; scroll-margin-top: 120px;"
      id="main-content"
      class="box"
    >
      Content Area
    </div>
    <div class="box">Send me a message</div>
  </div>
</article>
