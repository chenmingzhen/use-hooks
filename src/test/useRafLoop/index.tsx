import * as React from 'react'
import useUpdate from '../../hooks/useUpdate'
import useRafLoop from '../../hooks/useRafLoop'

const Demo = () => {
  const [ticks, setTicks] = React.useState(0)
  const [lastCall, setLastCall] = React.useState(0)
  const update = useUpdate()

  const [loopStop, loopStart, isActive] = useRafLoop((time) => {
    setTicks((lastTicks) => lastTicks + 1)
    setLastCall(time)
  })

  return (
    <div>
      <div>RAF triggered: {ticks} (times)</div>
      <div>Last high res timestamp: {lastCall}</div>
      <br />
      <button
        onClick={() => {
          isActive() ? loopStop() : loopStart()
          update()
        }}
      >
        {isActive() ? 'STOP' : 'START'}
      </button>
    </div>
  )
}

export default Demo
