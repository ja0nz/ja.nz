export type FrontMatter = {
  title: string;
  summary: string;
  draft: boolean;
  id: number;
  category: string;
  tags?: string[];
  date?: number;
  image?: { src: string, alt: string }
};
export type TDate = { tag: string; date: number };

/* Utility Types */

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type Flip<T, K extends keyof T> = Concrete<Pick<T, K>> & Omit<T, K>;
