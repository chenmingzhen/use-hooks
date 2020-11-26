import React from 'react'
import useBeforeUnload from '../../hooks/useBeforeUnload'
import useToggle from '../../hooks/useToggle'

const Demo = () => {
  const [dirty, toggleDirty] = useToggle(false)
  useBeforeUnload(dirty, 'You have unsaved changes, are you sure?')

  return (
    <div>
      {dirty && <p>Try to reload or close tab</p>}
      <button onClick={() => toggleDirty()}>{dirty ? 'Disable' : 'Enable'}</button>
    </div>
  )
}

export default Demo
