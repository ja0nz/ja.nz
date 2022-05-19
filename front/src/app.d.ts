import type { LoadOutput } from "@sveltejs/kit";
import type { Writable } from "svelte/store";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface Locals {
    userid: string;
  }

  // interface Platform {}

  // interface Session {}

  interface Stuff {
    content: Writable<ParsedIssue[]>;
  }
}

type ParsedIssue = {
  id: string;
  title: string;
  number: number;
  body: string;
  comments: {
    nodes: [];
  };
  reactions: {
    nodes: [];
  };
  data: {
    title: string;
    author: string[];
    draft: boolean;
    timestamp: number;
    state: "CLOSED" | "OPEN";
    milestone?: string;
    date?: Date;
    tags?: string[];
  };
};

type LoadSingle = LoadOutput<{ content: ParsedIssue }>;
type LoadAll = LoadOutput<{ content: ParsedIssue[] }>;

export { ParsedIssue, LoadSingle, LoadAll };
