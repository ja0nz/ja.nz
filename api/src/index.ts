import { contentTitle, filterTitle, noop, parseContent } from './xform'
import { handlerPager, handlerRefresh, handlerSing } from './handlers'

import { Router } from 'itty-router'
import { header } from './headers'

const router = Router()
const cache = caches.default

router
  .get('/v1/raw', handlerPager(header(0), noop))
  .get('/v1/raw/issue/:id', handlerSing(header(30), noop))
  .get('/v1/raw/title/:id', handlerPager(header(0), filterTitle))
  .get('/v1/parsed', handlerPager(header(0), parseContent))
  .get('/v1/parsed/issue/:id', handlerSing(header(30), parseContent))
  .get('/v1/parsed/title/:id', handlerPager(header(0), contentTitle))
  .get('/v1/refresh', handlerRefresh())
  .get('*', () => new Response('Not found', { status: 404 }))

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    const inCache: Response | undefined = await cache.match(req)
    if (inCache) return inCache
    // Construct response
    const res: Promise<Response> = router.handle(req, env, ctx)
    ctx.waitUntil(res.then((r) => cache.put(req, r.clone())))
    return res
  },
  /*
   * Cache refresh every ~ 30 min
   */
  async scheduled(
    _: ScheduledController | null,
    env: Env,
    ctx: ExecutionContext,
  ) {
    await handlerRefresh()({ params: undefined }, env, ctx)
  },
}
