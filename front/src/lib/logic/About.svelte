<script lang="ts">
  import TagCard from "$lib/layout/TagCard.svelte";
  const H = "visually-hidden";

  let about = false;
  let self: HTMLElement;
  export function toggleAbout() {
    about = !about;
    const children = self.parentElement?.children;
    for (let toHide of [...children ?? []]) {
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
  <div on:click={toggleAbout}>⬅️Profile</div>
  <div>Picture</div>
  <div>About me</div>
  <div>Links</div>
{:else}
  <TagCard>
    <!-- Slot picture -->
    <picture slot="picture">
      <source srcset="profile.webp" />
      <img
        on:click={toggleAbout}
        src="profile.jpg"
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
<div class="contents" bind:this={self}></div>

<style>
  img:hover {
    cursor: pointer;
  }
</style>
