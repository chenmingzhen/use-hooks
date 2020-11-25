import React from 'react'
import useAsyncRetry from '../../hooks/useAsyncRetry'

const fn = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        reject(new Error('Random error!'))
      } else {
        resolve('RESOLVED')
      }
    }, 1000)
  })

const Demo = () => {
  const state = useAsyncRetry(fn)

  return (
    <div>
      {state.loading ? <div>Loading...</div> : state.error ? <div>Error...</div> : <div>Value: {state.value}</div>}
      {!state.loading ? <a onClick={() => state.retry()}>Retry</a> : null}
    </div>
  )
}

export default Demo
