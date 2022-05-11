import { push, transduce } from '@thi.ng/transducers'
import { Issue } from 'gh-cms-ql'
import { fetchAll, fetchQl, queryIPager, queryISing } from '../graphql'

export const handlerPager = (xform: any, headers: any) =>
  async function ({ params }: Query, env: Env): Promise<Response> {
    const id = params?.id
    let body: Array<Issue> | Issue = []
    try {
      body = await fetchQl(env, fetchAll(queryIPager))
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

export const handlerSing = (xform: any, headers: any) =>
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
