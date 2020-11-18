import isDeepEqualReact from 'fast-deep-equal/react'

export type FnReturningPromise = (...args: any[]) => Promise<any>

// https://segmentfault.com/a/1190000018514540?utm_source=tag-newest
// Promise then 中的值  Promise<T>  返回的是这个T  Promise.resolve().then(data:T)
export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never

export const isClient = typeof window === 'object'

export const isDeepEqual: (a: any, b: any) => boolean = isDeepEqualReact
