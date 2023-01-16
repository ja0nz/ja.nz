import type { MarkdownInstance } from "astro";

/* Utility Types */
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type MarkSet<T, K extends keyof T> = Concrete<Pick<T, K>> & Omit<T, K>;
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

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
export type FM_D = MarkSet<FrontMatter, "date">;
export type FM_DT = MarkSet<FrontMatter, "date" | "tags">;
export type TMenuCard = { tag: string; date: number; avatar: string };
export type Glob = MarkdownInstance<FrontMatter>;
