import React, { useCallback } from 'react'
import useEvent from '../../hooks/useEvent'

const Demo = () => {
  const onKeyDown = useCallback(({ key }) => {
    console.log(key)
  }, [])
  useEvent('keydown', onKeyDown)
  return <div id="useEvent">click me</div>
}

export default Demo
