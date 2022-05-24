<script context="module" lang="ts">
  import { get } from "svelte/store";
  import { byTagsLatest, filterContent } from "$lib/xform";
  // Pass the `stuff` from __layout into the props of this page
  export async function load({ params, url, stuff }: LoadInput) {
    const tag = params.slug;
    console.log(tag);
    // TODO
    const anchor = url.searchParams;
    return {
      props: {
        ...stuff,
        contentByTag: byTagsLatest(tag, get(stuff.ALL)),
        tagsByLatest: latestTags(get(stuff.ALL)),
      },
    };
  }
</script>

<script lang="ts">
  // import type { Writable } from "svelte/store";
  // export let ALL: Writable<ParsedIssue[]>;
  export let contentByTag: ParsedIssue[];
  export let tagsByLatest: [string, number][];

  import type { ParsedIssue } from "src/app";
  import { highlightTags, latestTags } from "$lib/xform";
  import { highlightDOMString } from "$lib/highlightDOM";
  import type { LoadInput } from "@sveltejs/kit";
  import { filterFuzzy } from "@thi.ng/transducers";
  import ContentHeader from "$lib/blocks/ContentHeader.svelte";

  // Filter label
  let inputTags: HTMLInputElement;
  const focusSearch = (e: KeyboardEvent) => {
    if (e.key === "/" && inputTags && document.activeElement !== inputTags)
      inputTags.select();
  };
  let tags: IterableIterator<[string, number]>;
  let fuzzyTags = "";
  $: tags = filterFuzzy(
    fuzzyTags,
    { key: (x: [string, number]) => x[0] },
    tagsByLatest
  );
  // -- Filter label finished
  // Filter content
  let cont: IterableIterator<ParsedIssue>;
  let fuzzyContent = "";
  $: cont = filterContent(
    fuzzyContent,
    { key: (x: ParsedIssue) => x.body },
    contentByTag
  );
</script>

<svelte:window on:keyup={focusSearch} />

<article class="sidebar">
  <div class="menu | sticky-header">
    <ContentHeader>
      <!-- Slot picture -->
      <picture slot="picture">
        <source srcset="profile.webp" />
        <img
          src="profile.jpg"
          class="rounded-full"
          alt="Profile picture of ja0nz"
        />
      </picture>
      <!-- Slot text -->
      <div slot="text">
        <p>ja0nz's blog</p>
        <p class="subcontent">last seen at 11.11.2022</p>
      </div>
    </ContentHeader>
    <input
      aria-label="Search tags"
      type="text"
      bind:value={fuzzyTags}
      bind:this={inputTags}
      placeholder="Hit / to search"
    />
    <div class="overflow-y-auto">
      {#each [...tags] as [tag, ts]}
        <a href={`/:${tag}`}>
          <ContentHeader>
            <!-- Slot picture -->
            <picture slot="picture">
              <source srcset="profile.webp" />
              <img
                src="profile.jpg"
                class="rounded-full"
                alt="Profile picture of ja0nz"
              />
            </picture>
            <!-- Slot text -->
            <div slot="text">
              <p>{@html highlightTags(tag, fuzzyTags)}</p>
              <p>Last seen</p>
            </div>
          </ContentHeader>
        </a>
      {/each}
    </div>
  </div>
  <div id="not-sidebar" class="no-content">
    <div class="key-header | splitter sticky-header">
      <p>⬅</p>
      <ContentHeader>
        <!-- Slot picture -->
        <picture slot="picture">
          <source srcset="profile.webp" />
          <img
            src="profile.jpg"
            class="rounded-full"
            alt="Profile picture of ja0nz"
          />
        </picture>
        <!-- Slot text -->
        <div slot="text">
          <p>Topic Card Photo blah</p>
        </div>
      </ContentHeader>
      <aside>
        <input
          aria-label="Search tags"
          type="text"
          bind:value={fuzzyContent}
          placeholder="Search feed"
        />
        <div>ThemeSwitch</div>
      </aside>
    </div>
    <div style="scroll-margin-top: 120px;" id="main-content" class="box">
      {#each [...cont] as { body }}
        <div class="box">
          {@html highlightDOMString(
            body,
            fuzzyContent,
            (token) => `<span class="underline">${token}</span>`
          )}
        </div>
      {/each}
    </div>
    <div class="box">Send me a message</div>
  </div>
</article>
