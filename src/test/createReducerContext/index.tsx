import React from 'react'
import createReducerContext from '../../hooks/createReducerContext'

type Action = 'increment' | 'decrement'

const reducer = (state: number, action: Action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      throw new Error()
  }
}

const reducerTo = (state: number, action: Action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      throw new Error()
  }
}

const [useSharedCounter, SharedCounterProvider] = createReducerContext(reducer, 0)
const [useSharedCounterTo, SharedCounterProviderTo] = createReducerContext(reducerTo, 10)

const ComponentA = () => {
  const [count, dispatch] = useSharedCounter()
  const [countTo, dispatchTo] = useSharedCounterTo()
  return (
    <p>
      Component A &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;
      {count}
      &nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
      <button
        onClick={() => {
          dispatchTo('increment')
          console.log(countTo)
        }}
      >
        click me show To
      </button>
    </p>
  )
}

const ComponentB = () => {
  const [count, dispatch] = useSharedCounter()
  return (
    <p>
      Component B &nbsp;
      <button type="button" onClick={() => dispatch('decrement')}>
        -
      </button>
      &nbsp;
      {count}
      &nbsp;
      <button type="button" onClick={() => dispatch('increment')}>
        +
      </button>
    </p>
  )
}

const Demo = () => {
  return (
    <SharedCounterProvider>
      <SharedCounterProviderTo>
        <p>Those two counters share the same value.</p>
        <div>
          <ComponentA />
        </div>
        <ComponentB />
      </SharedCounterProviderTo>
    </SharedCounterProvider>
  )
}

export default Demo
