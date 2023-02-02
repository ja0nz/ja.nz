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
import type {
  FrontMatter,
  Tags,
  FM_D,
  FM_DT,
  Glob,
  Optional,
  MarkSet,
} from "./api";
import { createAvatar } from "./avatar";

/* Getters/Setters */
const getFM = defGetter<Glob, "data">(["data"]);
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

/*
 * Return Tags; by latest first
 * Consumend by MainMenu
 */
export function createTags(posts: Glob[]): Tags[] {
  return transduce(
    comp(
      // Selection
      map((x) => <FrontMatter>getFM(x)), // FM only
      filter((x) => !!getTags(x)), // remove unset tags
      // Modification
      mapKeys({ date: (x) => +new Date(x) }), // format date to number
      map((x) => <FM_DT>x), // just a noop type cast
      mapcat<FM_DT, Optional<Tags, "avatar">>((x) =>
        x.tags.map((y) => ({ tag: y, date: x.date }))
      ), // make TTS
      // Reduction
      scan(groupTagLatest), // inbetween group/reduce by tags
      takeLast(1), // continue with last reduction
      mapcat(Object.values), // pull' n flat
      // Enhancing
      map((x) => Object.assign(x, { avatar: createAvatar(x.tag) })) // zip in Avatars
    ),
    pushSort(({ date: acc }, { date: x }) => x - acc),
    posts
  );
}

/*
 * Date sorted Collection
 * Consumed by
 */
export function sortCollection(posts: Glob[], active?: string): Glob[] {
  return transduce(
    comp(
      mapKeys({
        data: (x) => ({ ...x, title: x.title.split(",").slice(1).join("") }),
      }), // prepare title
      // filter for active tag
      filter(({ data }: Glob) => {
        // 1. If unset return all
        if (!active) return true;
        // 2. Else only selected posts
        const tags = data.tags || [];
        if (tags.includes(active)) {
          return true;
        }
        return false;
      })
    ),
    pushSort(({ data: acc }, { data: x }) => {
      const { date: markSafeX } = <MarkSet<typeof x, "date">>x;
      const { date: markSafeAcc } = <MarkSet<typeof acc, "date">>acc;
      return +new Date(markSafeX) - +new Date(markSafeAcc);
    }), // latest first
    posts
  );
}
