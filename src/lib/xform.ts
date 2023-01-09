import {
  comp,
  filter,
  groupByObj,
  map,
  mapcat,
  mapKeys,
  maxCompare,
  pushSort,
  scan,
  selectKeys,
  takeLast,
  transduce,
} from "@thi.ng/transducers";
import { defGetter } from "@thi.ng/paths";
import type { MarkdownInstance } from "astro";
import type { FrontMatter, Flip, TTS, Overview } from "./api";

/* Types */
type Post = MarkdownInstance<FrontMatter>;
type FmT = Flip<FrontMatter, "tags">;

/* Getters/Setters */
const fM = defGetter<Post, "frontmatter">(["frontmatter"]);
const draft = defGetter<FrontMatter, "draft">(["draft"]);
const tags = defGetter<FrontMatter, "tags">(["tags"]);
const ts = defGetter<FrontMatter, "timestamp">(["timestamp"]);

/* Reducer */
const groupTagLatest = groupByObj({
  key: ({ tag }: TTS) => tag, // group by "tag"
  group: maxCompare(
    (): TTS => ({ tag: "", timestamp: 0 }), // init/neutral
    ({ timestamp: acc }, { timestamp: t }) => acc - t // reduce by acc > t
  ),
});

/*
 * Return [tag, timestamp] pairs; by latest first
 * Consumend by MainMenu
 */
export function tagTimestampByLatest(
  posts: MarkdownInstance<FrontMatter>[]
): TTS[] {
  return transduce(
    comp(
      map(fM),
      filter((x) => !draft(x)), // remove drafts
      filter((x) => !!tags(x)), // remove unset tags
      map((x) => <FmT>x), // just a noop type cast
      mapcat<FmT, TTS>((x) =>
        x.tags.map((y) => ({ tag: y, timestamp: ts(x) }))
      ), // splice to
      scan(groupTagLatest), // inbetween group/reduce by tags
      takeLast(1), // continue with last reduction
      mapcat(Object.values) // pull' n flat
    ),
    pushSort(({ timestamp: acc }, { timestamp: x }) => x - acc), // latest first
    posts
  );
}

/*
 * Return selected FrontMatter; by latest first
 * Consumed by
 */
export function renderOverview(posts: MarkdownInstance<FrontMatter>[]): Overview[] {
  return transduce(
    comp(
      map(fM),
      filter((x) => !draft(x)), // remove drafts
      mapKeys({ title: (x) => x.split(",").slice(1).join("") }), // prepare title
      selectKeys(["id", "title", "summary", "timestamp", "tags", "category"]) // select needed
    ),
    pushSort(({ timestamp: acc }, { timestamp: x }) => x - acc), // latest first
    posts
  );
}
