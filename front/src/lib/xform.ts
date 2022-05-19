import {
  comp,
  filter,
  groupByObj,
  map,
  mapcat,
  maxCompare,
  transduce,
} from "@thi.ng/transducers";
import { timestampP, tagsP } from "$lib/paths";
import type { ParsedIssue } from "src/app";
import type { IObjectOf } from "@thi.ng/api";

/*
 * Return latest [tag, timestamp] pairs
 */
export function latestTags(all: ParsedIssue[]) {
  type In = [string[] | undefined, number];
  const frequent: IObjectOf<[string, number]> = transduce(
    comp(
      map<ParsedIssue, In>((x) => [tagsP(x), timestampP(x)]),
      filter((x) => x[0] !== undefined),
      mapcat<In, [string, number]>((x) => x[0]?.map((y) => [y, x[1]]))
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
  return Object.values(frequent).sort((acc, x) => x[1] - acc[1]);
}
