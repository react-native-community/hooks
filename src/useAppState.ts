import React, { useEffect, useState } from 'react'
import { AppState } from 'react-native'

const currentState = AppState.currentState

export default () => {
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