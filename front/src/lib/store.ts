import type { ParsedIssue } from "src/app";
import { writable } from "svelte/store";
export const parsedStore = writable<ParsedIssue[]>([]);
