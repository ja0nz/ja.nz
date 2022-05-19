import { browser, dev } from "$app/env";
import { get, readable } from "svelte/store";

import type { Fn } from "@thi.ng/api";
import type { ParsedIssue } from "src/app";
import { parsed } from "$lib/dev/browser";
import { parsedStore } from "$lib/store";

export async function fetchApi(fetch: Fn<RequestInfo, Promise<Response>>) {
  const content = browser && get(parsedStore);
  if (content && content.length) {
    return parsedStore;
  }

  const api = `https://api-ja-nz.janz.workers.dev/v1/parsed`;
  const response = dev ? parsed.clone() : await fetch(api);
  if (!response.ok) throw Error("status: 500 ");
  const fetchedContent: ParsedIssue[] = await response.json();

  if (browser) {
    parsedStore.set(fetchedContent);
    return parsedStore;
  } else {
    return readable(fetchedContent);
  }
}
