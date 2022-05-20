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
  return filter((x: A) => key(x).includes(query), src);
}

/*
 * Highlight tag search
 */
export function highLightContentDOM(html: string, search: string) {
  if (!search) return html; // protects agains SSR
  let n: Node | null;
  const nodes: HTMLElement[] = [];
  const element = document.createRange().createContextualFragment(html);
  const walk = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT);
  while ((n = walk.nextNode())) n && nodes.push(n as HTMLElement);
  for (const n of nodes) {
    if (n.childNodes[0].nodeValue === n.textContent) {
      n.innerHTML = n.innerHTML.replace(
        new RegExp(search, "g"),
        `<span class="underline">${search}</span>`
      );
    }
  }
  const container = document.createElement("div");
  container.appendChild(element);
  return container.innerHTML;
}
