import {
  comp,
  filter,
  groupByObj,
  map,
  mapcat,
  maxCompare,
  str,
  pushSort,
  transduce,
} from "@thi.ng/transducers";
import { goto } from "$app/navigation";
import { tagsP, timestampP } from "$lib/paths";

import type { Fn, IObjectOf } from "@thi.ng/api";
import type { ParsedIssue } from "src/app";

/* Utils */
const noUndefTags = filter<ParsedIssue>((x) => tagsP(x) !== undefined);

/*
 * Return latest [tag, timestamp] pairs
 */
export function latestTags(all: ParsedIssue[]) {
  const frequent: IObjectOf<[string, number]> = transduce(
    comp(
      noUndefTags,
      mapcat<ParsedIssue, [string, number]>((x) =>
        tagsP(x)?.map((y) => [y, timestampP(x)])
      )
    ),
    groupByObj({
      key: (x: [string, number]) => x[0],
      group: maxCompare(
        (): [string, number] => ["", 0],
        (acc, x) => acc[1] - x[1]
      ),
    }),
    all
  );
  // latest first
  return pushSort((a, b) => b[1] - a[1], Object.values(frequent));
}

/*
 * Highlight tag search
 */
export const highlightTags = (tag: string, search: string) =>
  transduce(
    map(
      (x) =>
        `<span ${search.includes(x) ? 'class="underline"' : ""}>${x}</span>`
    ),
    str(),
    tag
  );

/*
 * Content by tags
 */
export function byTagsLatest(tag: string, all: ParsedIssue[]) {
  return transduce(
    comp(
      noUndefTags,
      filter((x) => (tag ? (tagsP(x) as string[]).includes(tag) : true))
    ),
    pushSort((a, b) => timestampP(b) - timestampP(a)),
    all
  );
}

/*
 * Analogue to filterFuzzy
 */
export function filterContent<A>(
  query: string,
  opts: { key: Fn<A, string> },
  src: Iterable<A>
): IterableIterator<A> {
  const { key } = opts;
  return filter((x: A) => {
    if (!query) return true; // protects agains SSR
    const fragment = document.createRange().createContextualFragment(key(x));
    return new RegExp(query, "i").test(fragment.textContent ?? "");
  }, src);
}

export function str2Hsl(stringInput: string) {
  const stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 95%, 65%)`;
}

export function cornerLinearGradient(tags: string[] | undefined) {
  if (!tags || tags.length === 0) return "";
  const cover = 90;
  const steps = (100 - cover) / tags.length;
  const seed: [string, number][] = [["transparent", cover]];
  const str = tags.reduce((acc, x) => {
    const lastNo = acc[acc.length - 1][1];
    return [...acc, [str2Hsl(x), lastNo], [str2Hsl(x), lastNo + steps]];
  }, seed) as [string, number][];
  return `linear-gradient(45deg, ${str
    .map(([x, y]) => `${x} ${y + "%"}`)
    .join(",")})`;
}
