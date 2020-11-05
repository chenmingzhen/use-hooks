import { useEffect } from 'react'
import { useFirstMountState } from './useFirstMountState'

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMount = useFirstMountState()
  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
    return undefined
  }, deps)
}

export default useUpdateEffect
