type Issue = {
  id: string;
  title: string;
  number: number;
  body: string;
};

type FM = {
  title: string;
  author: string[];
  draft: boolean;
  timestamp: number;
  state: "CLOSED" | "OPEN";
  milestone?: string;
  date?: Date;
  tags?: string[];
};

type IssueFM = Issue & { data: FM };

export { Issue, FM, IssueFM };
