import {
  comp,
  filter,
  groupByObj,
  map,
  mapcat,
  maxCompare,
  pushSort,
  transduce,
} from "@thi.ng/transducers";
import { defGetter } from "@thi.ng/paths";
import type { MarkdownInstance } from "astro";
import type { FrontMatter, Flip } from "./api";

/* Types */
type Post = MarkdownInstance<FrontMatter>;
type TagTs = [string, number];
type FmT = Flip<FrontMatter, "tags">;

/* Getters/Setters */
const fM = defGetter<Post, "frontmatter">(["frontmatter"]);
const draft = defGetter<FrontMatter, "draft">(["draft"]);
const tags = defGetter<FrontMatter, "tags">(["tags"]);
const ts = defGetter<FrontMatter, "timestamp">(["timestamp"]);

/* Reducer */
const groupTagLatest = groupByObj({
  key: ([tag]: TagTs) => tag, // group by "tag"
  group: maxCompare(
    (): TagTs => ["", 0], // init/neutral
    ([_, acc], [_1, x]) => acc - x // reduce by acc > x
  ),
});

/*
 * Return latest [tag, timestamp] pairs
 * Consumend by MainMenu
 */
export function tagTimestampByLatest(
  posts: MarkdownInstance<FrontMatter>[]
): TagTs[] {
  const latestTag = transduce(
    comp(
      map(fM),
      filter((x) => !draft(x)), // remove drafts
      filter((x) => !!tags(x)), // remove unset tags
      map<FrontMatter, FmT>((x) => <FmT>x), // just a type cast
      mapcat<FmT, TagTs>((x) => x.tags.map((y) => [y, ts(x)])) // splice to
    ),
    groupTagLatest,
    posts
  );
  // sort by x > acc
  return pushSort(([_, acc], [_1, x]) => x - acc, Object.values(latestTag));
}
