import React, { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'


const currentState = AppState.currentState

export default () => {
  const [appState, setAppState] = useState(currentState)

  function onChange(newState: AppStateStatus) {
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
