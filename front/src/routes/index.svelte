<script>
  let tags = ["typescript", "purescript", "nixOS"];
</script>

<article class="sidebar">
  <div class="menu | sticky-header">
    <div class="box">image, bla</div>
    <div class="tagSearch">Fuzzy tag search</div>
    <div class="overflow-y-auto">
      {#each tags as tag}
        <div class="box">{tag}</div>
      {/each}
    </div>
  </div>
  <div id="not-sidebar" class="">
    <div class="key-header | splitter sticky-header">
      <div class="box">Topic Card Photo blah</div>
      <aside>
        <div class="search box">Search</div>
        <div class="themeswitch">ThemeSwitch</div>
      </aside>
    </div>
    <div style="min-height: 1500px;" class="overflow-y-auto box">
      Content Area
    </div>
  </div>
</article>
