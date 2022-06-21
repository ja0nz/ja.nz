import type { ParsedIssue } from "src/app";
import { comp } from "@thi.ng/compose";
import { defGetter } from "@thi.ng/paths";

export const dataP = defGetter<ParsedIssue, "data">(["data"]);
export const numberP = defGetter<ParsedIssue, "number">(["number"]);
export const bodyP = defGetter<ParsedIssue, "body">(["body"]);
export const comments = defGetter<ParsedIssue, "comments", "nodes">([
  "comments",
  "nodes",
]);
export const reactions = defGetter<ParsedIssue, "reactions", "nodes">([
  "reactions",
  "nodes",
]);

/*
 * Data elements
 * data: {
      title: '#5,Proxy',
      author: [Array],
      date: '2022-04-26T10:35:00.000Z',
      tags: [Array],
      draft: false,
      milestone: 'micro',
      timestamp: 1650969300000,
      state: 'CLOSED'
    }
 */
export const tagsP = comp(
  defGetter<ParsedIssue["data"], "tags">(["tags"]),
  dataP
);
export const titleP = comp(
  defGetter<ParsedIssue["data"], "title">(["title"]),
  dataP
);
export const titleNumberP = comp((x) => x.split(",")[0].substring(1), titleP);

export const timestampP = comp(
  defGetter<ParsedIssue["data"], "timestamp">(["timestamp"]),
  dataP
);
