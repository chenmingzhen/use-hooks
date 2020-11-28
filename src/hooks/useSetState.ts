import { useCallback, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
const useSetState = <T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((preState: T) => Partial<T>)) => void] => {
  const [state, set] = useState<T>(initialState)
  const setState = useCallback(
    (patch) => {
      set((prevState) => ({ ...prevState, ...(patch instanceof Function ? patch(prevState) : patch) }))
    },
    [set]
  )

  return [state, setState]
}

export default useSetState
