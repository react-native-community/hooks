import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default () => {
  const [keyboard, setKeyboard] = useState({})

  function keyboardDidShow(e) {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height
    })
  }

  function keyboardDidHide(e) {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e.endCoordinates.height
    })
  }

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    )

    return () => {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }
  }, [])
  return keyboard
}
