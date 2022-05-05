import { Router } from 'itty-router'

import Issues from './handlers/issues'
//import Reactions from './handlers/reactions'

const router = Router()

router
  .get('*', Issues)
  //  .get('/v1/reactions', Reactions)
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
