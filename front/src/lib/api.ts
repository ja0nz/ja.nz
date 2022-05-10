import { comp, filter, map } from "@thi.ng/transducers";

import type { Issue, FM, IssueFM } from "$lib/bindings";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import { matter } from "vfile-matter";

export const urlAll = () => `https://api.ja.nz/v1/issues`;
export const urlNo = (n: string) => `https://api.ja.nz/v1/issue/${n}`;

const md2htmlFragment = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter)
  .use(() => (_, file) => {
    matter(file);
  })
  .use(remarkRehype)
  .use(rehypeStringify);

export const getMDContent = (slug: string) =>
  comp(
    // filter post
    filter((x: Issue) => x.title.startsWith(`#${slug}`)),
    // map to html
    map<Issue, IssueFM>((x: Issue) => {
      const vfile = md2htmlFragment.processSync(x.body);
      return { ...x, body: vfile.toString(), data: vfile.data.matter as FM };
    })
  );
