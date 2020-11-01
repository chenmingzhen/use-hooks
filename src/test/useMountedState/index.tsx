import React, { useEffect } from 'react'
import useMountedState from '../../hooks/useMountedState'

const Demo: React.FC = () => {
  const isMounted = useMountedState()

  useEffect(() => {
    if (isMounted()) {
      console.log(isMounted())
    }
    return () => {
      if (!isMounted()) {
        console.log('结束挂载')
      }
    }
  })

  return <div>结束挂载</div>
}

export default Demo
