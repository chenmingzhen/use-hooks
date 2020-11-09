import React from 'react'
import createStateContext from '../../hooks/createStateContext'

const [useSharedText, SharedTextProvider] = createStateContext<string>('')

const ComponentA: React.FC = () => {
  const [text, setText] = useSharedText()
  return (
    <p>
      Component A:
      <br />
      <input type="text" value={text} onInput={(ev) => setText(ev.target.value)} />
    </p>
  )
}

const ComponentB = () => {
  const [text, setText] = useSharedText()
  return (
    <p>
      Component B:
      <br />
      <input type="text" value={text} onInput={(ev) => setText(ev.target.value)} />
    </p>
  )
}

const Demo = () => {
  return (
    <SharedTextProvider initialValue="default">
      <p>Those two fields share the same value.</p>
      <ComponentA />
      <ComponentB />
    </SharedTextProvider>
  )
}

export default Demo
