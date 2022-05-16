import type { Fn, IObjectOf } from '@thi.ng/api'
import { Transducer, push, transduce } from '@thi.ng/transducers'
import { fetchAll, fetchQl, queryIPager, queryISing } from './graphql'
import { header, nearestHalfHourUTC } from './headers'

import { Issue } from 'gh-cms-ql'
import { noop } from './xform'

const cKey = 'http://api.ja.nz/__dummy'
const cache = caches.default

export const handlerPager = (
  headers: IObjectOf<string>,
  xform: Fn<string | undefined, Transducer<Issue, any>>,
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
  headers: IObjectOf<string>,
  xform: Fn<string | undefined, Transducer<Issue, any>>,
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

export const handlerRefresh = () =>
  async function (
    _: Query,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    await cache.delete(cKey)
    const refresh = handlerPager(header(nearestHalfHourUTC(new Date())), noop)
    ctx.waitUntil(refresh({ params: undefined }, env, ctx))
    const res = new Response(JSON.stringify({ status: 'success' }), {
      headers: { 'Cache-Control': 'max-age=0' },
    })
    return res
  }
