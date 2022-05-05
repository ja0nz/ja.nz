import { fetchExhaust, queryIPager } from "../graphql"

const Issues = async function (req: Request, env: Env): Promise<Response> {
  let x: Array<any> = [];
  try {
    x = await fetchExhaust(env, queryIPager());
  } catch (e) {
    console.error(`ERROR: ${JSON.stringify(e)}`)
  }
  console.log(JSON.stringify(x));
  const body = JSON.stringify({ answer: 42 })
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${60}`, // 1 minute.. for now
  }
  const res = new Response(body, { headers })
  return res
}

export default Issues
