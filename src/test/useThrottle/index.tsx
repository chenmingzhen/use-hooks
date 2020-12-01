import React from 'react'
import useThrottle from '../../hooks/useThrottle'

const Demo = () => {
  const [state, setState] = React.useState('Typing stopped')
  const [val, setVal] = React.useState('')
  const [debouncedValue, setDebouncedValue] = React.useState('')

  const [throttle] = useThrottle(
    () => {
      setState('Typing stopped')
      setDebouncedValue(val)
    },
    2000,
    [val]
  )
  return (
    <div>
      <input
        type="text"
        value={val}
        placeholder="Debounced input"
        onChange={({ currentTarget }) => {
          setState('Waiting for typing to stop...')
          setVal(currentTarget.value)
          throttle()
        }}
      />
      <div>{state}</div>
      <div>Debounced value: {debouncedValue}</div>
    </div>
  )
}

export default Demo
