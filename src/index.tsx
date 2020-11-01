import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Demo from './test/useAsyncFc'

ReactDOM.render(
  <React.StrictMode>
    <Demo url="www.baidu.com" />
  </React.StrictMode>,
  document.getElementById('root')
)
