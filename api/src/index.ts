import { Router } from 'itty-router'

import { handlerPager, handlerSing } from './handlers/handlers'
import { sec30, sec300 } from './handlers/headers'
import { getMDContent, noOp } from './handlers/xform'
import { simpleFilter } from './handlers/xform'

const router = Router()

router
  .get('/v1/raw', handlerPager(simpleFilter, sec300))
  .get('/v1/raw/title/:id', handlerPager(simpleFilter, sec300))
  .get('/v1/raw/issue/:id', handlerSing(noOp, sec30))
  .get('/v1/parsed', handlerPager(getMDContent, sec300))
  .get('/v1/parsed/title/:id', handlerPager(getMDContent, sec300))
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
