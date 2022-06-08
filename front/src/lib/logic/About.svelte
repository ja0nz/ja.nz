<script lang="ts">
  import AboutCard from "$lib/layout/AboutCard.svelte";
  import TagCard from "$lib/layout/TagCard.svelte";
  const H = "visually-hidden";

  let about = false;
  let self: HTMLElement;
  export function toggleAbout() {
    about = !about;
    const children = self.parentElement?.children;
    for (let toHide of [...(children ?? [])]) {
      if (toHide.classList.contains(H)) {
        toHide.classList.remove(H);
        toHide.inert = false;
      } else {
        toHide.classList.add(H);
        toHide.inert = true;
      }
    }
  }
</script>

{#if about}
  <AboutCard>
    <!-- Slot return -->
    <div slot="return">
      <TagCard>
        <button slot="picture" on:click={toggleAbout}>⬅️</button>
        <div slot="text">
          <div>
            <span>R</span>
            <span>E</span>
            <span>T</span>
            <span>U</span>
            <span>R</span>
            <span>N</span>
            <div />
          </div>
        </div></TagCard
      >
    </div>
    <!-- Slot picture -->
    <picture slot="picture">
      <source srcset="profile.webp" />
      <img src="profile.jpg" class="rounded-full" alt="Profile of ja0nz" />
    </picture>
    <!-- Slot text -->
    <div slot="text">
      <div>About me</div>
      <div>Links</div>
    </div>
  </AboutCard>
{:else}
  <TagCard>
    <!-- Slot picture -->
    <picture slot="picture">
      <source srcset="profile.webp" />
      <img
        on:click={toggleAbout}
        src="profile.jpg"
        style="cursor: pointer;"
        class="rounded-full"
        alt="Profile of ja0nz"
      />
    </picture>
    <!-- Slot text -->
    <div slot="text">
      <a href="/">
        <p>ja0nz's blog</p>
      </a>
      <p class="subcontent">last seen at 11.11.2022</p>
    </div>
  </TagCard>
{/if}
<div class="contents" bind:this={self} />
