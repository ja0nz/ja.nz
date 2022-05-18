import { tick } from "svelte";
import { browser } from "$app/env";

export async function scrollEnd() {
  // bit hacky but best effort
  await tick();
  if (browser && !window.pageYOffset)
    window.scrollTo(0, document.body.scrollHeight);
}
