import type { MarkdownInstance } from "astro";

/* Utility Types */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type Flip<T, K extends keyof T> = Concrete<Pick<T, K>> & Omit<T, K>;
/* End Utility */

export type FrontMatter = {
  title: string;
  summary: string;
  draft: boolean;
  id: number;
  category: string;
  tags?: string[];
  date?: number;
  image?: { src: string; alt: string };
};
export type FM_D = Flip<FrontMatter, "date">;
export type FM_DT = Flip<FrontMatter, "date" | "tags">;
export type TDate = { tag: string; date: number };
export type Glob = MarkdownInstance<FrontMatter>;
