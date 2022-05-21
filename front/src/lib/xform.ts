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
type Split = string | [string];
function _splitC(
  content: string,
  token: string,
  highlight: Fn<string, string>
): Split[] {
  return content
    .split(token)
    .reduce(
      (acc: Split[], y: Split) =>
        typeof acc.at(-1) === "string"
          ? acc.concat([[highlight(token)], y])
          : acc.concat([y]),
      []
    );
}
export function highLightDOMContent(
  html: string,
  search: string,
  highlight: Fn<string, string>,
  insentitive = true
) {
  if (!search) return html; // protects agains SSR
  let n: Node | null;
  const nodes: Text[] = [];
  const element = document.createRange().createContextualFragment(html);
  const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  while ((n = walk.nextNode())) n && nodes.push(n as Text);
  for (const n of nodes) {
    if (!n.data) continue;
    const match = n.data.matchAll(new RegExp(search, insentitive ? "gi" : "g"));
    const uniq = [...new Set([...match].map((x) => x[0]))];

    let iterate: Split[] = [n.data];
    for (const s of uniq) {
      iterate = iterate.reduce(
        (acc: Split[], content) =>
          typeof content === "string"
            ? acc.concat(_splitC(content, s, highlight))
            : acc.concat([content]),
        []
      );
    }

    const newText = iterate
      .flatMap((sfrag: Split) =>
        typeof sfrag === "string"
          ? sfrag
              .replaceAll("&", "&amp;")
              .replaceAll("<", "&lt;")
              .replaceAll(">", "&gt;")
          : sfrag
      )
      .join("");
    const fragment = document.createRange().createContextualFragment(newText);
    n.replaceWith(fragment);
  }
  return [].map
    .call(element.childNodes, (x: HTMLElement) => x.outerHTML)
    .join("");
}
