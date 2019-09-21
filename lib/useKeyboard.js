import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default function useKeyboard() {
  const [keyboard, setKeyboard] = useState({ Keyboard })

  function keyboardShown(e) {
    setKeyboard({
      isKeyboardShow: true,
      Keyboard,
      endCoordinates: e.endCoordinates,
      startCoordinates: e.startCoordinates
    })
  }

  function keyboardHidden(e) {
    setKeyboard({
      isKeyboardShow: false,
      Keyboard,
      endCoordinates: e.endCoordinates,
      startCoordinates: e.startCoordinates
    })
  }

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardHidden
    )

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardShown
    )

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardShown
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardHidden
    )

    return () => {
      keyboardWillShowListener.remove()
      keyboardDidShowListener.remove()
      keyboardWillHideListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])
  return keyboard
}
