import React, { useRef } from 'react'
import useGetSet from '../../hooks/useGetSet'

const Demo = () => {
  const objRef = useRef({ a: 1 })
  const [get, set] = useGetSet<{ a: number }>(objRef.current)
  const onClick = () => {
    setTimeout(() => {
      set({ a: get().a + 1 })
      console.log(objRef.current)
    }, 1_000)
  }

  return <button onClick={onClick}>Clicked:{get().a}</button>
}

// 原始实现方法
// const Demo = () => {
//   const objRef = useRef({ a: 1 })
//   const refObj = useRef(objRef.current)
//   const onClick = () => {
//     setTimeout(() => {
//       // eslint-disable-next-line no-plusplus
//       refObj.current.a = refObj.current.a++
//       console.log(objRef.current)
//     }, 1_000)
//   }
//
//   return <button onClick={onClick}>Clicked:{refObj.current.a}</button>
// }

export default Demo
