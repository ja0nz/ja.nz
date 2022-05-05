import { Issue, queryBodyI, queryTitleI } from 'gh-cms-ql'
import { fetchExhaust, queryIPager } from '../graphql'

const Issues = async function (_: Query, env: Env): Promise<Response> {
  let body: Array<Issue> = []
  try {
    body = await fetchExhaust(env, queryIPager(queryTitleI, queryBodyI))
  } catch (e) {
    console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
    return new Response('Could not fetch GitHub', { status: 500 })
  }
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${300}`, // 5 minutes
  }
  const res = new Response(JSON.stringify(body), { headers })
  return res
}

export default Issues
