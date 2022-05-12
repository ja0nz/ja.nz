import type { Fn, IObjectOf } from '@thi.ng/api'
import { push, transduce, Transducer } from '@thi.ng/transducers'
import { Issue } from 'gh-cms-ql'
import { fetchAll, fetchQl, queryIPager, queryISing } from '../graphql'
const cKey = 'http://in.ter.nal.dum.my'
const cache = caches.default

export const handlerPager = (
  xform: Fn<string | undefined, Transducer<Issue, any>>,
  headers: IObjectOf<string>,
) =>
  async function (
    { params }: Query,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const id = params?.id
    let body: Array<Issue> | Issue = []
    const inCache: Response | undefined = await cache.match(cKey)
    try {
      if (inCache) {
        body = await inCache.json()
      } else {
        body = await fetchQl(env, fetchAll(queryIPager))
        ctx.waitUntil(
          cache.put(cKey, new Response(JSON.stringify(body), { headers })),
        )
      }
    } catch (e) {
      console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
      return new Response('Could not fetch GitHub', { status: 500 })
    }
    const out = transduce(
      xform(id),
      push(),
      Array.isArray(body) ? body : [body],
    )
    const res = new Response(JSON.stringify(out), { headers })
    return res
  }

export const handlerSing = (
  xform: Fn<string | undefined, Transducer<Issue, any>>,
  headers: IObjectOf<string>,
) =>
  async function ({ params }: Query, env: Env): Promise<Response> {
    const id = params?.id
    let body: Array<Issue> | Issue = []
    try {
      body = await fetchQl(env, fetchAll(queryISing), id)
    } catch (e) {
      console.error(`ERROR: GitHub ${JSON.stringify(e)}`)
      return new Response('Could not fetch GitHub', { status: 500 })
    }
    const out = transduce(
      xform(id),
      push(),
      Array.isArray(body) ? body : [body],
    )
    const res = new Response(JSON.stringify(out), { headers })
    return res
  }
