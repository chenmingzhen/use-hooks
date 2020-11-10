import React, { useState } from 'react'
import useLifecycles from '../../hooks/useLifecycles'

const Component = () => {
  useLifecycles(
    () => {
      console.log('mount_1')
    },
    () => {
      console.log('unMount_1')
    }
  )

  useLifecycles(
    () => {
      console.log('mount_2')
    },
    () => {
      console.log('unMount_2')
    }
  )

  return <div id="one">useLifecycles</div>
}

const Demo = () => {
  const [show, setShow] = useState(true)
  if (show) {
    return (
      <div
        onClick={() => {
          setShow(!show)
        }}
      >
        <Component />
      </div>
    )
  }
  return (
    <div
      onClick={() => {
        setShow(!show)
      }}
    >
      show
    </div>
  )
}

export default Demo
