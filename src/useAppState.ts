import {useEffect, useState} from 'react'
import {AppState, AppStateStatus} from 'react-native'

export function useAppState() {
  const currentState = AppState.currentState
  const [appState, setAppState] = useState(currentState)

  function onChange(newState: AppStateStatus) {
    setAppState(newState)
  }

  useEffect(() => {
    AppState.addEventListener('change', onChange)

    return () => {
      AppState.removeEventListener('change', onChange)
    }
  }, [])

  return appState
}
