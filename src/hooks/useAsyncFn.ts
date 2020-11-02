import { DependencyList, useCallback, useState, useRef } from 'react'
import useMountedState from './useMountedState'
import { FnReturningPromise, PromiseType } from '../utils/util'

export type AsyncState<T> =
  | {
      loading: boolean
      error?: undefined
      value?: undefined
    }
  | {
      loading: true
      error?: Error | undefined
      value?: T
    }
  | {
      loading: false
      error: Error
      value?: undefined
    }
  | {
      loading: false
      error?: undefined
      value: T
    }
// ReturnType<T> 返回的是Promise类型
// PromiseType 返回的是上一个ReturnType的Promise中的返回数据
// AsyncState 返回{loading: true  error?: Error | undefinedvalue?: T}

// const [state, callback] = useAsyncFn<() => Promise<{ code: number; data: string }>>()
// 上面为例 ReturnType<T>为 Promise<{ code: number; data: string } PromiseType为{ code: number; data: string }
// AsyncState{loading:boolean,error:Error,{ code: number; data: string }}
type StateFromFnReturningPromise<T extends FnReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>

export type AsyncFnReturn<T extends FnReturningPromise = FnReturningPromise> = [StateFromFnReturningPromise<T>, T]

export default function useAsyncFn<T extends FnReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFnReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
  const lastCallId = useRef(0)
  const isMounted = useMountedState()
  const [state, set] = useState<StateFromFnReturningPromise<T>>(initialState)

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    // eslint-disable-next-line no-plusplus
    const callId = ++lastCallId.current
    set((prevState) => ({ ...prevState, loading: true }))

    return fn(...args).then(
      (value) => {
        isMounted() && callId === lastCallId.current && set({ value, loading: false })

        return value
      },
      (error) => {
        isMounted() && callId === lastCallId.current && set({ error, loading: false })

        return error
      }
    ) as ReturnType<T>
  }, deps)

  return [state, (callback as unknown) as T]
}
