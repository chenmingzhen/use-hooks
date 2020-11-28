import React from 'react'
import useSetState from '../../hooks/useSetState'

interface State {
  hello?: string
  foo?: string
  count?: number
  cnt?: number
}

const Demo = () => {
  const [state, setState] = useSetState<State>({})

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={() => setState({ hello: 'world' })}>hello</button>
      <button onClick={() => setState({ foo: 'bar' })}>foo</button>
      <button
        onClick={() => {
          setState((prevState) => ({
            count: (prevState.count || 0) + 1,
          }))
        }}
      >
        count
      </button>
      <button
        onClick={() => {
          setState((prevState) => ({
            cnt: (prevState?.cnt || 0) + 1,
          }))
        }}
      >
        cnt
      </button>
    </div>
  )
}

export default Demo
