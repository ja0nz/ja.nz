import type { ParsedIssue } from "src/app";
import { comp } from "@thi.ng/compose";
import { defGetter } from "@thi.ng/paths";

export const dataP = defGetter<ParsedIssue, "data">(["data"]);
export const numberP = defGetter<ParsedIssue, "number">(["number"]);
export const tagsP = comp(
  defGetter<ParsedIssue["data"], "tags">(["tags"]),
  dataP
);
export const titleP = comp(
  defGetter<ParsedIssue["data"], "title">(["title"]),
  dataP
);

export const timestampP = comp(
  defGetter<ParsedIssue["data"], "timestamp">(["timestamp"]),
  dataP
);
