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
  const t = tag.substring(1);
  return transduce(
    comp(
      noUndefTags,
      filter((x) => (t ? (tagsP(x) as string[]).includes(t) : true))
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

// const C_TOGGLE = "no-content";
// export const changeRouteWClass = (route: string) => () => {
//   if (window.innerWidth <= 1100) {
//     const content = document.querySelector("#not-sidebar");
//     if (content?.classList.contains(C_TOGGLE)) {
//       content?.classList.remove(C_TOGGLE);
//     } else {
//       content?.classList.add(C_TOGGLE);
//     }
//   }
//   goto(route);
// };
