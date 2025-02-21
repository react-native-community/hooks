import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, KeyboardMetrics} from 'react-native'

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
})
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
}

export function useKeyboard() {
  const [shown, setShown] = useState(false)
  const [showing, setShowing] = useState(false)
  const [hiding, setHiding] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    start: undefined | KeyboardMetrics
    end: KeyboardMetrics
  }>(initialValue)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setShowing(true)
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true)
    setShowing(false)
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    setKeyboardHeight(e.endCoordinates.height)
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setHiding(true)
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false)
    setHiding(false)
    if (e) {
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    } else {
      setCoordinates(initialValue)
      setKeyboardHeight(0)
    }
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

  return {
    keyboardShown: shown,
    keyboardShowing: showing,
    keyboardHiding: hiding,
    coordinates,
    keyboardHeight,
  }
}
