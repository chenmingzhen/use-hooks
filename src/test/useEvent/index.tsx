import React, { useEffect, useState } from 'react'

const Demo = () => {
  const [obj, setObj] = useState({ a: { b: 1 } })

  useEffect(() => {
    console.log(obj)
  }, [obj])
  return (
    <div
      onClick={() => {
        setObj({ a: { b: new Date().getSeconds() } })
      }}
    >
      click me
    </div>
  )
}

export default Demo
