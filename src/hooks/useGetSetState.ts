import { useCallback, useRef } from 'react'
import useUpdate from './useUpdate'

type UseGetSetStateReturn<T> = [() => T, (patch: Partial<T>) => void]

const useGetSetState = <T extends object>(init: T = {} as T): UseGetSetStateReturn<T> => {
  const update = useUpdate()
  const state = useRef<T>(init)

  const get = useCallback(() => state.current, [])
  const set = useCallback((patch: Partial<T>) => {
    if (!patch || typeof patch !== 'object') return

    Object.assign(state.current, patch)
    update()
  }, [])

  return [get, set]
}

export default useGetSetState
