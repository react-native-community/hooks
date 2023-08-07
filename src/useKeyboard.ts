import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, KeyboardMetrics, Platform} from 'react-native'

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
  const [coordinates, setCoordinates] = useState<{
    start: undefined | KeyboardMetrics
    end: KeyboardMetrics
  }>(initialValue)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)
  const iosPlatform = Platform.OS === 'ios'

  const handleKeyboardShow: KeyboardEventListener = (e) => {
    setShown(true)
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    setKeyboardHeight(e.endCoordinates.height)
  }
  const handleKeyboardHide: KeyboardEventListener = (e) => {
    setShown(false)
    if (e) {
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    } else {
      setCoordinates(initialValue)
      setKeyboardHeight(0)
    }
  }

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener(iosPlatform ?  'keyboardWillShow' : 'keyboardDidShow', handleKeyboardShow),
      Keyboard.addListener(iosPlatform ?  'keyboardWillHide' : 'keyboardDidHide', handleKeyboardHide),
    ]

    return () => {
      subscriptions.forEach((subscription) => subscription.remove())
    }
  }, [])

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  }
}
