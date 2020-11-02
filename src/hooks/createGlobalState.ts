import { useState } from 'react'
import useEffectOnce from './useEffectOnce'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export function createGlobalState<S = any>(initialState?: S) {
  const store: { state: S | undefined; setState: (state: S) => void; setters: any[] } = {
    state: initialState,
    setState(state: S) {
      store.state = state
      store.setters.forEach((setter) => setter(store.state))
    },
    // useGlobalValue的订阅数目
    setters: [],
  }

  return (): [S | undefined, (state: S) => void] => {
    const [globalState, stateSetter] = useState<S | undefined>(store.state)

    // 当有订阅的组件unmount的时候 将它从订阅中除去
    useEffectOnce(() => () => {
      store.setters = store.setters.filter((setter) => setter !== stateSetter)
    })

    // ❗❗❗ different
    // 在渲染前 将组件加入订阅
    useIsomorphicLayoutEffect(() => {
      if (!store.setters.includes(stateSetter)) {
        store.setters.push(stateSetter)
      }
    }, [])

    return [globalState, store.setState]
  }
}

export default createGlobalState
