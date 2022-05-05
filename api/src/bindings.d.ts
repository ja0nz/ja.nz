import { IObjectOf } from '@thi.ng/api'

export {}

declare global {
  const R_OWNER: string
  const R_NAME: string
  const GH_TOKEN: string
  const caches: CacheStorage
  type Env = {
    GH_TOKEN: string
    owner: string
    repo: string
  }
  type Query = {
    params: IObjectOf<string>
    query: IObjectOf<string>
  }
}
