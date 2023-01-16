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
  transduce,
} from "@thi.ng/transducers";
import { defGetter } from "@thi.ng/paths";
import type { MarkdownInstance } from "astro";
import type {
  FrontMatter,
  TMenuCard,
  FM_D,
  FM_DT,
  Glob,
  Optional,
} from "./api";
import { createAvatar } from "./avatar";

/* Getters/Setters */
const fM = defGetter<Glob, "frontmatter">(["frontmatter"]);
const draft = defGetter<FrontMatter, "draft">(["draft"]);
const tags = defGetter<FrontMatter, "tags">(["tags"]);

/* Reducer */
const groupTagLatest = groupByObj({
  key: ({ tag }: Optional<TMenuCard, "avatar">) => tag, // group by "tag"
  group: maxCompare(
    (): Optional<TMenuCard, "tag" | "avatar"> => ({ date: 0 }), // init/neutral
    ({ date: acc }, { date: t }) => acc - t // reduce by acc > t
  ),
});

/* Utils */
const preflight = comp(
  map(fM),
  filter((x) => !draft(x)), // remove drafts (plus ensuring date is set)
  mapKeys({ date: (x) => +new Date(x) }), // format date to number
  mapKeys({ title: (x) => x.split(",").slice(1).join("") }) // prepare title
);

/*
 * Return TMenuCard; by latest first
 * Consumend by MainMenu
 */
export function createMenuCard(
  posts: MarkdownInstance<FrontMatter>[]
): TMenuCard[] {
  return transduce(
    comp(
      preflight,
      filter((x) => !!tags(x)), // remove unset tags
      map((x) => <FM_DT>x), // just a noop type cast
      mapcat<FM_DT, Optional<TMenuCard, "avatar">>((x) =>
        x.tags.map((y) => ({ tag: y, date: x.date }))
      ), // make TTS
      scan(groupTagLatest), // inbetween group/reduce by tags
      takeLast(1), // continue with last reduction
      mapcat(Object.values), // pull' n flat
      map((x) => Object.assign(x, { avatar: createAvatar(x.tag) })) // zip in Avatars
    ),
    pushSort(({ date: acc }, { date: x }) => x - acc), // latest first
    posts
  );
}

/*
 * Return selected FrontMatter; by latest first
 * Consumed by
 */
export function renderOverview(posts: MarkdownInstance<FrontMatter>[]): FM_D[] {
  return transduce(
    preflight,
    pushSort(({ date: acc }, { date: x }) => x - acc), // latest first
    posts
  );
}
