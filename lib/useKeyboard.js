import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default function useKeyboard() {
  const [keyboard, setKeyboard] = useState({ Keyboard })

  function keyboardShown(e) {
    setKeyboard({
      isKeyboardShow: true,
      Keyboard,
      endCoordinates: e.endCoordinates,
      startCoordinates: e.startCoordinates,
      duration: e.duration,
      easing: e.easing
    })
  }

  function keyboardHidden(e) {
    setKeyboard({
      isKeyboardShow: false,
      Keyboard,
      endCoordinates: e.endCoordinates,
      startCoordinates: e.startCoordinates,
      duration: e.duration,
      easing: e.easing
    })
  }

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardShown
    )

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardShown
    )

    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardHidden
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
