export type FrontMatter = {
  title: string;
  author: string[];
  summary?: string;
  date?: Date;
  tags?: string[];
  draft: boolean;
  id: number;
  category: string;
  timestamp: number;
};

export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

export type Flip<T, K extends keyof T> = Concrete<Pick<T, K>> & Omit<T, K>;
