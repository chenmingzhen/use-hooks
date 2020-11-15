import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './test/usePromise'

ReactDOM.render(
  <React.StrictMode>
    <Demo
      promise={
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('data')
          }, 5000)
        })
      }
    />
  </React.StrictMode>,
  document.getElementById('root')
)

setTimeout(() => {
  if (document.getElementById('root')) {
    ReactDOM.unmountComponentAtNode(document.getElementById('root') as Element)
  }
}, 2000)
