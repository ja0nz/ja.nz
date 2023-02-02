import { CollectionEntry, getCollection } from "astro:content";

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
export type Tags = { tag: string; date: number; avatar: string };

export type Collections = "long" | "short";
export type Glob = CollectionEntry<"long"> | CollectionEntry<"short">;

export type Render = {
  active: string | undefined;
  tags: Tags[];
  collection: Glob[];
};

/* Collection Functions */
export function getC<T extends Collections>(col: T) {
  return getCollection(col, ({ data }) => !data.draft);
}
