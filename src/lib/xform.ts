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
  takeLast,
  trace,
  transduce,
} from "@thi.ng/transducers";
import { defGetter } from "@thi.ng/paths";
import type { MarkdownInstance } from "astro";
import type { FrontMatter, Tags, FM_D, FM_DT, Glob, Optional } from "./api";
import { createAvatar } from "./avatar";

/* Getters/Setters */
const getFM = defGetter<Glob, "frontmatter">(["frontmatter"]);
const getDraft = defGetter<FrontMatter, "draft">(["draft"]);
const getTags = defGetter<FrontMatter, "tags">(["tags"]);

/* Reducer */
const groupTagLatest = groupByObj({
  key: ({ tag }: Optional<Tags, "avatar">) => tag, // group by "tag"
  group: maxCompare(
    (): Optional<Tags, "tag" | "avatar"> => ({ date: 0 }), // init/neutral
    ({ date: acc }, { date: t }) => acc - t // reduce by acc > t
  ),
});

/* Utils */
const prologue = comp(
  map(getFM),
  filter((x) => !getDraft(x)), // remove drafts (plus ensuring date is set)
  mapKeys({ date: (x) => +new Date(x) }), // format date to number
  mapKeys({ title: (x) => x.split(",").slice(1).join("") }), // prepare title
  filter((x) => !!getTags(x)) // remove unset tags
);

/*
 * Return Tags; by latest first
 * Consumend by MainMenu
 */
export function createTags(posts: MarkdownInstance<FrontMatter>[]): Tags[] {
  return transduce(
    comp(
      prologue,
      map((x) => <FM_DT>x), // just a noop type cast
      mapcat<FM_DT, Optional<Tags, "avatar">>((x) =>
        x.tags.map((y) => ({ tag: y, date: x.date }))
      ), // make TTS
      scan(groupTagLatest), // inbetween group/reduce by tags
      takeLast(1), // continue with last reduction
      mapcat(Object.values), // pull' n flat
      map((x) => Object.assign(x, { avatar: createAvatar(x.tag) })) // zip in Avatars
    ),
    pushSort(({ date: acc }, { date: x }) => x - acc),
    posts
  );
}

/*
 * Return selected FrontMatter; by latest first
 * Consumed by
 */
export function createFM(
  posts: MarkdownInstance<FrontMatter>[],
  active: string
): FM_D[] {
  return transduce(
    comp(
      prologue,
      // filter for active tag
      filter((x) => (active ? (<string[]>getTags(x)).includes(active) : true))
    ),
    pushSort(({ date: acc }, { date: x }) => x - acc), // latest first
    posts
  );
}
