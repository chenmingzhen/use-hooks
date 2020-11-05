import React from 'react'
import createMemo from '../../hooks/createMemo'

const fibonacci = (n) => {
  if (n === 0) return 0
  if (n === 1) return 1
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return fibonacci(n - 1) + fibonacci(n - 2)
}

const useMemoFibonacci = createMemo(fibonacci)

export const Demo = () => {
  const result1 = useMemoFibonacci(10)
  const result2 = useMemoFibonacci(20)
  return (
    <div>
      {result1}
      {result2}
    </div>
  )
}
