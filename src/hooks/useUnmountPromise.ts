import { useEffect, useMemo, useRef } from 'react'

export type Race = <P extends Promise<any>, E = any>(Promise: P, onError?: (e: E) => void) => P

const useUnmountPromise = (): Race => {
  const refUnmounted = useRef(false)
  useEffect(() => () => {
    refUnmounted.current = true
  })

  return useMemo(() => {
    return <P extends Promise<any>, E>(promise: P, onError?: (error: E) => void) => {
      return new Promise((resolve, reject) => {
        promise.then(
          (result) => {
            if (!refUnmounted.current) resolve(result)
          },
          (error) => {
            if (!refUnmounted.current) reject(error)
            else if (onError) onError(error)
            else console.error('useUnmountPromise', error)
          }
        )
      }) as P
    }
  }, [])
}

export default useUnmountPromise
