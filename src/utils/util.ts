import isDeepEqualReact from 'fast-deep-equal/react'

export type FnReturningPromise = (...args: any[]) => Promise<any>

// https://segmentfault.com/a/1190000018514540?utm_source=tag-newest
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never
