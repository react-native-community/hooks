import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'

export default () => {
  const [press, setPress] = useState(false)

  backPressed = () => {
    this.props.navigation.goBack();
    setPress(true);
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    return () => {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);

    }
  }, [])

  return press
}