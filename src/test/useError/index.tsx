import React from 'react'
import useError from '../../hooks/useError'

class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

const Demo = () => {
  const dispatcher = useError()

  const clickHandler = () => {
    dispatcher(new Error('useError'))
  }

  return <button onClick={clickHandler}>Click me to throw</button>
}

const App = () => (
  <ErrorBoundary>
    <Demo />
  </ErrorBoundary>
)

export default App
