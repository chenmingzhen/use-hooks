import React, { FC, useState } from 'react'
import { createGlobalState } from '../../hooks/createGlobalState'

const useGlobalValue = createGlobalState<number>(0)

const CompA: FC = () => {
  const [value, setValue] = useGlobalValue()

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return <div onClick={() => setValue(value + 1)}>+</div>
}

const CompB: FC = () => {
  const [value, setValue] = useGlobalValue()

  // @ts-ignore
  return <div onClick={() => setValue(value - 1)}>-</div>
}

const Demo: FC = () => {
  const [value] = useGlobalValue()
  const [show, setShow] = useState(false)
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <p
        onClick={() => {
          setShow(!show)
        }}
      >
        {value}
      </p>
      <CompA />
      {show ? <CompB /> : ''}
    </div>
  )
}

export default Demo
