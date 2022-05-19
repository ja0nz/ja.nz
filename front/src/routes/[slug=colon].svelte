<script context="module" lang="ts">
  import type { LoadInput } from "@sveltejs/kit";
  import type { ParsedIssue, LoadAll } from "src/app";
  import { dev } from "$app/env";
  import { parsed } from "$lib/dev/browser";
  import { latestTags } from "$lib/xform";
  import { filterFuzzy } from "@thi.ng/transducers";

  export async function load({
    params,
    fetch,
    url,
  }: LoadInput): Promise<LoadAll> {
    const tag = params.slug;
    // TODO
    const anchor = url.searchParams;
    const api = `https://api-ja-nz.janz.workers.dev/v1/parsed`;
    const response = dev ? parsed.clone() : await fetch(api);
    if (!response.ok) return { status: 500 };
    const content: ParsedIssue[] = await response.json();
    if (!content) return { status: 404 };

    return {
      status: response.status,
      cache: { maxage: 60 },
      props: {
        content,
      },
    };
  }
</script>

<script lang="ts">
  export let content: ParsedIssue[];

  const tagsAll: [string, number][] = latestTags(content);

  // Filter
  let inputEl: HTMLInputElement;
  const focusSearch = (e: KeyboardEvent) => {
    if (e.key === "/" && inputEl) inputEl.select();
  };
  let lT: IterableIterator<[string, number]>;
  let search = "";
  const highlight = (tag: string) =>
    tag.replace(
      new RegExp(search, "g"),
      `<span class="underline">${search}</span>`
    );
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
        <div class="box">{@html highlight(tag)}</div>
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
