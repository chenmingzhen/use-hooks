import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false)
  const get = useCallback(() => mountedRef.current, [])

  useEffect(() => {
    mountedRef.current = true
    console.log(get(), 'after useMountedState setValue')

    return () => {
      mountedRef.current = false
      console.log(get(), 'useMountedState unmounted')
    }
  })
  console.log(get(), 'before useMountedState setValue')
  return get
}
