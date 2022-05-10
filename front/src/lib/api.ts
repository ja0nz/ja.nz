import { comp, filter, map } from "@thi.ng/transducers";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import { matter } from "vfile-matter";


export const urlAll = () => `https://api.ja.nz/v1/issues`;
type Issue = {
    id: string;
    title: string;
    number: number;
    body: string;
}

const md2htmlFragment = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter)
  .use(() => (_, file) => {
      matter(file)
    })
  .use(remarkRehype)
  .use(rehypeStringify)

export const getMDContent = (slug: string) =>
  comp(
    // filter post
    filter((x: Issue) => x.title.startsWith(`#${slug}`)),
    // map to html
    map((x) => {
        const vfile = md2htmlFragment.processSync(x.body);
        return { ...x, body: vfile.toString(), data: vfile.data.matter }
    })
  );

export const parseContent =
    comp(
        map(x => x)
    )

