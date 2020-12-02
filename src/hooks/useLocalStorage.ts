import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { isClient } from '../utils/util'

type ParserOptions<T> =
  | { raw: true }
  | { raw: false; serializer: (value: T) => string; deserializer: (value: string) => T }

type UseLocalStorageReturn<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void]

const noop = () => {}

const useLocalStorage = <T>(key: string, initialValue?: T, options?: ParserOptions<T>): UseLocalStorageReturn<T> => {
  if (!isClient) {
    return [initialValue as T, noop, noop]
  }

  if (!key) {
    throw new Error('useLocalStorage key may not be falsy')
  }

  const deserializer = options ? (options.raw ? (value) => value : options.deserializer) : JSON.parse

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T | undefined>(() => {
    try {
      const serializer = options ? (options.raw ? String : options.serializer) : JSON.stringify

      const localStorageValue = localStorage.getItem(key)

      if (localStorageValue) {
        return deserializer(localStorageValue)
      }
      return initialValue && localStorage.setItem(key, serializer(initialValue))
    } catch {
      return initialValue
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState = typeof valOrFunc === 'function' ? (valOrFunc as Function)(state) : valOrFunc
        if (typeof newState === 'undefined') return
        let value: string

        if (options)
          if (options.raw)
            if (typeof newState === 'string') value = newState
            else value = JSON.stringify(newState)
          else if (options.serializer) value = options.serializer(newState)
          else value = JSON.stringify(newState)
        else value = JSON.stringify(newState)

        localStorage.setItem(key, value)
        setState(deserializer(value))
      } catch (e) {
        console.error('useLocalStorage set:', e)
      }
    },
    [key, setState]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setState(undefined)
    } catch (e) {
      console.error('useLocalStorage remove:', e)
    }
  }, [key, setState])

  return [state, set, remove]
}
export default useLocalStorage
