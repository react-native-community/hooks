import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, KeyboardMetrics} from 'react-native'

const emptyCoordinates: KeyboardMetrics = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
})
const initialValue = {
  start: emptyCoordinates as KeyboardMetrics | undefined,
  end: emptyCoordinates,
}
const defaultState = {
  keyboardShown: false,
  coordinates: initialValue,
  keyboardHeight: 0,
}

export function useKeyboard() {
  const [state, setState] = useState(defaultState)

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setState((prevState) => ({
      ...prevState,
      coordinates: {start: e.startCoordinates, end: e.endCoordinates},
    }))
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setState(() => ({
      keyboardShown: true,
      coordinates: {start: e.startCoordinates, end: e.endCoordinates},
      keyboardHeight: e.endCoordinates.height,
    }))
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setState((prevState) => ({
      ...prevState,
      coordinates: {start: e.startCoordinates, end: e.endCoordinates},
    }))
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setState((prevState) => ({
      keyboardShown: false,
      coordinates: e
        ? {start: e.startCoordinates, end: e.endCoordinates}
        : initialValue,
      keyboardHeight: e ? prevState.keyboardHeight : 0,
    }))
  }

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ]

    return () => {
      subscriptions.forEach((subscription) => subscription.remove())
    }
  }, [])

  return state
}
