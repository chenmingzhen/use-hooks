import React from 'react'
import useShallowCompareEffect from '../../hooks/useShallowCompareEffect'
import useCounter from '../../hooks/useCounter'

const Demo = () => {
  const [count, { inc }] = useCounter(0)
  const options = { step: 2 }

  useShallowCompareEffect(() => {
    inc(options.step)
  }, [options])

  return (
    <div>
      <p>useShallowCompareEffect: {count}</p>
    </div>
  )
}

export default Demo
