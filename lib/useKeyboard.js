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
      keyboardHeight: e ? e.endCoordinates.height : null
    })
  }

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    )
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])
  return keyboard
}
