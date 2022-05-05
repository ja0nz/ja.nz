import { Router } from 'itty-router'

import Issues from './handlers/issues'
import IssuesMeta from './handlers/issues-meta'

const router = Router()

router
  .get('/v1/issues', Issues)
  .get('/v1/issue/:id', IssuesMeta)
  .get('*', () => new Response('Not found', { status: 404 }))

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const cache = caches.default
    const cached: Response | undefined = await cache.match(req)
    if (cached) return cached
    // Construct response
    const res: Promise<Response> = router.handle(req, env)
    ctx.waitUntil(cache.put(req, (await res).clone()))
    return res
  },
}
