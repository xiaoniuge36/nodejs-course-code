import { useState } from 'react'
import './App.css'
import { defineMessages, useIntl } from 'react-intl'

const messsages = defineMessages({
  increase: {
    id: "increase",
  },
  decrease: {
    id: "decrease"
  }
})

function App() {
  const [count, setCount] = useState(0)
  const intl = useIntl();

  return <div>
    <div>{count}</div>
    <button onClick={() => setCount(count => count + 1)}>{intl.formatMessage(messsages.increase)}</button>
    <button onClick={() => setCount(count => count - 1)}>{intl.formatMessage(messsages.decrease)}</button>
  </div>
}

export default App
