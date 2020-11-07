import React, { useState } from 'react'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createReducer from '../../hooks/createReducer'

interface ActionBase {
  type?: string
  payload?: { count: number }
}

type Action = ActionBase | ((dispatch: Action) => void)

interface State {
  count: number
}

const useThunkReducer = createReducer<Action, State>(thunk, logger)

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      console.log(state.count)
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: action.payload.count }
    default:
      throw new Error()
  }
}

const Demo = ({ initialCount = 1 }) => {
  const addAndReset = React.useCallback(() => {
    return (dispatch) => {
      dispatch({ type: 'increment' })

      setTimeout(() => {
        dispatch({ type: 'reset', payload: { count: initialCount } })
      }, 1000)
    }
  }, [initialCount])

  const [initialState, setInitialState] = useState({ count: 1 })

  const [state, dispatch] = useThunkReducer(reducer, initialState)

  return (
    <div>
      <p>
        count:
        {state.count}
      </p>
      <button onClick={() => dispatch(addAndReset())}>Add and reset</button>
      <button onClick={() => dispatch({ type: 'reset', payload: { count: initialCount } })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>

      {/* 注意 原始initialState改变 源码并不会触发更新 */}
      <button
        onClick={() => {
          setInitialState({ count: 10 })
        }}
      >
        change initialState
      </button>
    </div>
  )
}

export default Demo
