import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function get(context: APIContext) {
  const long = await getCollection("long");

  return rss({
    title: "ja|nz's logbook",
    description: "A humble Astronaut’s guide to the stars",
    site: context.site?.toString() || "",
    items: [],
  });
}
