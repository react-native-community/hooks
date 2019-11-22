import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardEventListener, ScreenRect } from 'react-native'

export default function useKeyboard() {
  const [shown, setShown] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    start: ScreenRect
    end: ScreenRect
  }>({
    start: { screenX: 0, screenY: 0, width: 0, height: 0 },
    end: { screenX: 0, screenY: 0, width: 0, height: 0 },
  })

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true)
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false)
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      handleKeyboardWillShow,
    )
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    )
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      handleKeyboardWillHide,
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    )

    return () => {
      keyboardWillShowListener.remove()
      keyboardDidShowListener.remove()
      keyboardWillHideListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return {
    keyboardShown: shown,
    coordinates,
  }
}
