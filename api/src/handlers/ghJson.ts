import { Issue } from 'gh-cms-ql'
import { fetchAll, fetchQl, queryIPager, queryISing } from '../graphql'

export const byTitle = async function (
  { params }: Query,
  env: Env,
): Promise<Response> {
  const id = params?.id
  let body: Array<Issue> | Issue = []
  try {
    body = await fetchQl(env, fetchAll(queryIPager))
  } catch (e) {
    console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
    return new Response('Could not fetch GitHub', { status: 500 })
  }
  const filtered = (Array.isArray(body) ? body : [body]).filter((x: Issue) =>
    id && x.title ? x.title.startsWith(`#${id}`) : true,
  )

  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${300}`, // 5 minutes
    'Access-Control-Allow-Origin': '*',
  }
  const res = new Response(JSON.stringify(filtered), { headers })
  return res
}

export const byIssue = async function (
  { params }: Query,
  env: Env,
): Promise<Response> {
  const id = params?.id
  let body: Array<Issue> | Issue = []
  try {
    body = await fetchQl(env, fetchAll(queryISing), id)
  } catch (e) {
    console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
    return new Response('Could not fetch GitHub', { status: 500 })
  }
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${30}`, // 30 secs
    'Access-Control-Allow-Origin': '*',
  }
  const res = new Response(JSON.stringify(body), { headers })
  return res
}
