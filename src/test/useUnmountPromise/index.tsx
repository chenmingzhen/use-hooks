import React, { useEffect } from 'react'
import useUnmountPromise from '../../hooks/useUnmountPromise'

const Demo = () => {
  const mounted = useUnmountPromise()

  useEffect(() => {
    ;(async () => {
      const result = await mounted(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('success data')
            console.log('Demo ')
          }, 5000)
        })
      )
      console.log('wait result')
      console.log(result) // "success data"
    })()
  }, [])

  return <div>1</div>
}

export default Demo
