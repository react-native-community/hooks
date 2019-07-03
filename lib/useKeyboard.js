import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default () => {
  const [keyboard, setKeyboard] = useState({})

  const keyboardDidShow = e => {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height
    })
  }

  const keyboardDidHide = e => {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e ? e.endCoordinates.height : null
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
