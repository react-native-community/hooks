import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default () => {
  const [keyboard, setKeyboard] = useState({})

  keyboardWillShow = e => {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height
    })
  }

  keyboardWillHide = e => {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e.endCoordinates.height
    })
  }

  useEffect(() => {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShow
    )
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide
    )

    return () => {
      this.keyboardWillShowListener.remove()
      this.keyboardWillHideListener.remove()
    }
  }, [])
  return keyboard
}
