import { Issue, queryCommentsI, queryReactionsI } from 'gh-cms-ql'
import { fetchQl, queryISing } from '../graphql'

const Issues = async function ({ params }: Query, env: Env): Promise<Response> {
  let body: Array<Issue> | Issue = []
  try {
    body = await fetchQl(
      env,
      queryISing(queryCommentsI, queryReactionsI),
      params.id,
    )
  } catch (e) {
    console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
    return new Response('Could not fetch GitHub', { status: 500 })
  }
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${30}`, // 30 secs
    'Access-Control-Allow-Origin': '*'
  }
  const res = new Response(JSON.stringify(body), { headers })
  return res
}

export default Issues
