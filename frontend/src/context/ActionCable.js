import React, { createContext, useEffect, useState } from 'react'
import { createConsumer } from '@rails/actioncable'

// create a shared context
// Context provides a way to share values like these
// between components without having to explicitly pass a prop
const ActionCableContext = createContext()

// create a context provider component
function ActionCableProvider({ url, children }) {
  const [cable, setCable] = useState(null)

  useEffect(() => {
    // create connection
    const cable = createConsumer(url)
    setCable(cable)

    // disconnect if component unmounts
    return function cleanup() {
      cable.disconnect()
      setCable(null)
    }
  }, [url])

  return (
    <ActionCableContext.Provider value={cable}>
      {children}
    </ActionCableContext.Provider>
  )
}

// for convenience, create a custom hook to access the context
// function useActionCable() {
//   return useContext(ActionCableContext)
// }

// exports
export { ActionCableContext, ActionCableProvider };
