import { comp, filter, map, noop as nope } from '@thi.ng/transducers'

import { Issue } from 'gh-cms-ql'
import MarkdownIt from 'markdown-it'
import grayMatter from 'front-matter'

const md = new MarkdownIt({
  html: true,
})

export const parseContent = () =>
  comp(
    // map frontmatter
    map<Issue, any>((x) => ({ ...x, body: grayMatter(x.body ?? '') })),
    // map to html
    map((x) => ({
      ...x,
      data: x.body.attributes,
      body: md.render(x.body.body ?? ''),
    })),
  )

export const noop = () => nope()

export const filterTitle = (slug: string | undefined) =>
  filter<Issue>((x) =>
    slug && x.title ? x.title.startsWith(`#${slug}`) : true,
  )

export const contentTitle = (slug: string | undefined) =>
  comp(filterTitle(slug), parseContent())
