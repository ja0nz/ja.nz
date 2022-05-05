import { graphql } from '@octokit/graphql'
import { Fn } from '@thi.ng/api'
import { comp } from '@thi.ng/compose'
import {
  getI,
  getR,
  getSingI,
  Issue,
  queryI,
  queryR,
  querySingI,
} from 'gh-cms-ql'

export const qlClient = ({ GH_TOKEN, owner, repo }: Env) =>
  graphql.defaults({
    headers: {
      authorization: `token ${GH_TOKEN}`,
      accept: 'application/vnd.github.v3+json',
    },
    variables: {
      owner,
      repo,
    },
  })

type GHCursor = string
export function queryISing(...q: string[]): Fn<string, string> {
  return (id: string) => comp(queryR, querySingI(id))(...q)
}
export function queryIPager(...q: string[]): Fn<GHCursor, string> {
  return (s: GHCursor) => comp(queryR, queryI(s))(...q)
}
export async function fetchExhaust(
  env: Env,
  query: Fn<GHCursor, string>,
): Promise<Issue[]> {
  const nodes: Issue[] = []
  let cursor: GHCursor = ''
  while (true) {
    const ql = await qlClient(env)(query(cursor))
    const qPayLoad = comp(getI, getR)(ql)
    nodes.push(...qPayLoad.nodes)
    if (qPayLoad.pageInfo.hasNextPage) {
      cursor = qPayLoad.pageInfo.endCursor
      continue
    }

    break
  }

  return nodes
}

export async function fetch(env: Env, query: string): Promise<Issue> {
  const ql = await qlClient(env)(query)
  const qPayLoad = comp(getSingI, getR as any)(ql)
  return qPayLoad
}
