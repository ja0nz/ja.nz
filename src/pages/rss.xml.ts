import rss from "@astrojs/rss";
import { CollectionEntry, getCollection } from "astro:content";
import type { APIContext } from "astro";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function get(context: APIContext) {
  const long = await getCollection(
    "long",
    ({ data }: CollectionEntry<"long">) => !data.draft
  );

  return rss({
    title: "ja|nz's logbook",
    description: "A hitchhiker's guide to the galaxy",
    site: context.site?.toString() || "",
    items: long.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date as Date,
      description: post.data.summary,
      link: `/read/${post.data.id}`,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
