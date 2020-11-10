import { useEffect } from 'react'

const useLifecycles = (mount: (...args: string[]) => any, unMount: (...args: string[]) => any) => {
  useEffect(() => {
    if (mount) {
      mount()
    }
    return () => {
      if (unMount) {
        unMount()
      }
    }
  }, [])
}

export default useLifecycles
