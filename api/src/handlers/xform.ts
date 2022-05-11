import { comp, filter, map, noop as nope } from '@thi.ng/transducers'
import grayMatter from 'front-matter'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({
  html: true,
})

export const parseContent = () =>
  comp(
    // map frontmatter
    map((x: any) => ({ ...x, body: grayMatter(x.body) })),
    // map to html
    map((x) => ({
      ...x,
      data: x.body.attributes,
      body: md.render(x.body.body ?? ''),
    })),
  )

export const noop = () => nope()

export const filterTitle = (slug: string | undefined) =>
  filter((x: any) => (slug && x.title ? x.title.startsWith(`#${slug}`) : true))

export const contentTitle = (slug: string | undefined) =>
  comp(filterTitle(slug), parseContent())
