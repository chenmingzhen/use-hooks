import React from 'react'
import useUpdate from '../../hooks/useUpdate'

const Demo = () => {
  const update = useUpdate()
  return (
    <>
      <div>
        Time:
        {Date.now()}
      </div>
      <button onClick={update}>Update</button>
    </>
  )
}

export default Demo
