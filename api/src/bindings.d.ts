export {}

declare global {
  const MY_ENV_VAR: string
  const MY_SECRET: string
  const myKVNamespace: KVNamespace
  const caches: CacheStorage
  type Env = {
    GH_TOKEN: string
  }
}
