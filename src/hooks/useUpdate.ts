import { useReducer } from 'react'

/* 强制更新组件 */

const updateReducer = (num: number): number => (num + 1) % 1_000_000

const useUpdate = (): (() => void) => {
  const [, update] = useReducer(updateReducer, 0)
  return update
}

export default useUpdate
