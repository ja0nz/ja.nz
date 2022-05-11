import { graphql } from '@octokit/graphql'
import { Fn } from '@thi.ng/api'
import { comp } from '@thi.ng/compose'
import {
  getI,
  getR,
  getSingI,
  Issue,
  queryBodyI,
  queryCommentsI,
  queryI,
  queryNumberI,
  queryR,
  queryReactionsI,
  querySingI,
  queryTitleI,
  R2,
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
  return (id: GHCursor) => comp(queryR, querySingI(id))(...q)
}
export function queryIPager(...q: string[]): Fn<GHCursor, string> {
  return (c: GHCursor) => comp(queryR, queryI(c))(...q)
}
export async function fetchQl(
  env: Env,
  query: Fn<GHCursor, string>,
  cursor: GHCursor = '',
): Promise<Issue[] | Issue> {
  let nodes: Issue[] | Issue = []
  while (true) {
    const ql = await qlClient(env)(query(cursor))
    const qPayLoad: R2<{ issues: Issue }> | Issue = comp(
      (x: any) => getI(x) ?? getSingI(x),
      getR,
    )(ql)
    if (Array.isArray(qPayLoad.nodes)) {
      nodes.push(...qPayLoad.nodes)
      if (qPayLoad.pageInfo?.hasNextPage) {
        cursor = qPayLoad.pageInfo?.endCursor
        if (cursor) continue
      }
    } else {
      nodes = <any>qPayLoad
    }

    break
  }

  return nodes
}

export const fetchAll = (f: typeof queryIPager | typeof querySingI) =>
  f(queryTitleI, queryNumberI, queryBodyI, queryCommentsI, queryReactionsI)
