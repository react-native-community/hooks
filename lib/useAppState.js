import React, { useEffect, useState } from 'react'
import { AppState } from 'react-native'

// https://github.com/facebook/react-native/issues/18836
export default () => {
  const currentState = AppState.currentState
  const [appState, setAppState] = useState(currentState)

  function onChange (newState) {
    setAppState(newState)
  }

  useEffect(() => {
    AppState.addEventListener('change', onChange)

    return () => {
      AppState.removeEventListener('change', onChange)
    }
  })

  return appState
}
