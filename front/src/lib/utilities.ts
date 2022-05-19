import { browser } from "$app/env";
import { tick } from "svelte";

export async function scrollEnd() {
  // bit hacky but best effort
  await tick();
  if (browser && !window.pageYOffset)
    window.scrollTo(0, document.body.scrollHeight);
}
