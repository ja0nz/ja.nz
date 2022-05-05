const Issues = function (req: Request, env: Env): Response {
  const body = JSON.stringify({ answer: 42 })
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=0, s-maxage=${60}`, // 1 minute.. for now
  }
  const res = new Response(body, { headers })
  return res
}

export default Issues
