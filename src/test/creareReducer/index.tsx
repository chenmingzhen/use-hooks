import React from 'react'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createReducer from '../../hooks/createReducer'

const useThunkReducer = createReducer(thunk, logger)

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
  // Action creator to increment count, wait a second and then reset
  const addAndReset = React.useCallback(() => {
    return (dispatch) => {
      dispatch({ type: 'increment' })

      setTimeout(() => {
        dispatch({ type: 'reset', payload: initialCount })
      }, 1000)
    }
  }, [initialCount])

  const [state, dispatch] = useThunkReducer(reducer, { count: initialCount })

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
    </div>
  )
}

export default Demo
