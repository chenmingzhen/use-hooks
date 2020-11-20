import { Dispatch, useMemo, useRef } from 'react'
import useUpdate from './useUpdate'
import { HookState, InitialHookState, resolveHookState } from '../utils/resolveHookState'

// 反应状态钩子返回状态getter函数而不是原始状态本身  即不改变原始数据
export default function useGetSet<S>(initialState: InitialHookState<S>): [() => S, Dispatch<HookState<S>>] {
  const state = useRef(resolveHookState(initialState))
  const update = useUpdate()

  return useMemo(
    () => [
      () => state.current,
      (newState: HookState<S>) => {
        state.current = resolveHookState(newState, state.current)
        update()
      },
    ],
    []
  )
}
