import { comp, filter, map, noop } from '@thi.ng/transducers'
import grayMatter from 'front-matter'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
  html: true,
})

export const noOp = (slug: string | undefined) => noop()

export const simpleFilter = (slug: string | undefined) =>
  filter((x: any) => (slug && x.title ? x.title.startsWith(`#${slug}`) : true))

export const getMDContent = (slug: string | undefined) =>
  comp(
    // filter post
    simpleFilter(slug),
    // map frontmatter
    map((x) => grayMatter(x.body)),
    // map to html
    map((x) => ({
      data: x.attributes,
      body: md.render(x.body ?? ''),
    })),
  )
