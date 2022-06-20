<script lang="ts">
  export let tagsByLatest: [string, number][];

  import { highlightTags } from "$lib/xform";
  import { filterFuzzy } from "@thi.ng/transducers";
  import TagCard from "$lib/layout/TagCard.svelte";
  // Filter label
  let inputTags: HTMLInputElement;
  const focusSearch = (e: KeyboardEvent) => {
    if (e.key === "/" && inputTags && document.activeElement !== inputTags)
      inputTags.select();
  };
  let tags: IterableIterator<[string, number]>;
  let fuzzyTags = "";
  // tags = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  $: tags = filterFuzzy(
    fuzzyTags,
    { key: (x: [string, number]) => x[0] },
    tagsByLatest
  );
</script>

<svelte:window on:keyup={focusSearch} />
<input
  aria-label="Search tags"
  type="text"
  bind:value={fuzzyTags}
  bind:this={inputTags}
  placeholder="Hit / to search"
/>
<div class="overflow-y-auto">
  {#each [...tags] as [tag, ts]}
    <a class="no-underline" href={`/:${tag}#main-content`}>
      <div class="hover:bg-secondary dark:hover:bg-primary">
        <TagCard>
          <!-- Slot picture -->
          <svg
            slot="picture"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
          <!-- Slot text -->
          <div slot="text">
            <p>{@html highlightTags(tag, fuzzyTags)}</p>
            <p>Last seen {new Date(ts).toLocaleDateString()}</p>
          </div>
        </TagCard>
      </div>
    </a>
  {/each}
</div>
