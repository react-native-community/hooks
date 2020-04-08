import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, ScreenRect} from 'react-native'

const initialValue = {
  start: {screenX: 0, screenY: 0, width: 0, height: 0},
  end: {screenX: 0, screenY: 0, width: 0, height: 0},
}

export function useKeyboard() {
  const [shown, setShown] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    start: ScreenRect
    end: ScreenRect
  }>(initialValue)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true)
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    setKeyboardHeight(e.endCoordinates.height)
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false)
    if (e) {
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    } else {
      setCoordinates(initialValue)
      setKeyboardHeight(0)
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow)
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide)
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow)
      Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow)
      Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide)
      Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide)
    }
  }, [])

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  }
}
