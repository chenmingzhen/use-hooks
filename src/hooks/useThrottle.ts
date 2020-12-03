import { useRef, useCallback, DependencyList } from 'react'

type UseThrottleReturn = [() => void]

// 根据调用节流
const useThrottle = (fn: Function, ms: number, deps: DependencyList = []): UseThrottleReturn => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const throttleFn = useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      fn(...args)
    }, ms)
  }, deps)

  return [throttleFn]
}

export default useThrottle
