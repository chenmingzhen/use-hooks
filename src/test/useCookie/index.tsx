import React, { useState, useEffect } from 'react'
import useCookie from '../../hooks/useCookie'

const Demo = () => {
  const [value, updateCookie, deleteCookie] = useCookie('my-cookie')
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    deleteCookie()
  }, [])

  const updateCookieHandler = () => {
    updateCookie(`my-awesome-cookie-${counter}`)
    setCounter((c) => c + 1)
  }

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={updateCookieHandler}>Update Cookie</button>
      <br />
      <button onClick={deleteCookie}>Delete Cookie</button>
    </div>
  )
}

export default Demo
