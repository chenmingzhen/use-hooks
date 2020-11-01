import React from 'react'
import useAsync from './hooks/useAsync'

const App: React.FC = () => {
  const state = useAsync<{ code: number; data: string }>(async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ code: 200, data: '成功拿到数据' })
      }, 3000)
    })
  }, [])

  return <div>{state.loading ? '加载中' : state.error ? '发生了错误' : `数据是${state?.value?.data}`}</div>
}

export default App
