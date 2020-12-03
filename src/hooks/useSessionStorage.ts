import { useEffect, useState } from 'react'
import { isClient } from '../utils/util'

const useSessionStorage = <T>(key: string, initialValue?: T, raw?: boolean): [T, (value: T) => void] => {
  if (!isClient) {
    return [initialValue as T, () => {}]
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key)
      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue))
        return initialValue
      }
      return raw ? sessionStorageValue : JSON.parse(sessionStorageValue || 'null')
    } catch {
      return initialValue
    }
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state)
      sessionStorage.setItem(key, serializedState)
    } catch {
      //
    }
  })

  return [state, setState]
}

export default useSessionStorage
