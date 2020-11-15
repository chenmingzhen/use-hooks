import React, { useEffect, useState } from 'react'
import usePromise from '../../hooks/usePromise'

const Demo: React.FC<{ promise: Promise<string> }> = ({ promise }) => {
  const mounted = usePromise()
  const [value, setValue] = useState('default')

  useEffect(() => {
    (async () => {
      const val = await mounted(promise)
      // This line will not execute if <Demo> component gets unmounted.
      setValue(val)
    })()
  })
  return <div>{value}</div>
}

export default Demo
