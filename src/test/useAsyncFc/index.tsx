import React, { useEffect } from 'react'
import useAsyncFn from '../../hooks/useAsyncFn'

interface Props {
  url?: string
}

export default function ({ url }: Props) {
  const [state, callback] = useAsyncFn<() => Promise<{ code: number; data: string }>>(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ code: 200, data: '成功拿到数据' })
      }, 3000)
    })
  }, [url])

  useEffect(() => {
    callback()
  }, [callback])

  return (
    <div>{state.loading ? '加载中' : state.value ? `数据是${state?.value.data}` : state.error ? '发生了错误' : ''}</div>
  )
}
