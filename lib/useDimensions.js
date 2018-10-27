import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default () => {
  const [dimensions, setDimensions] = React.useState({
    window: {
      width: null, height: null, fontScale: null, scale: null
    },
    screen: {
      fontScale: null, height: null, scale: null, width: null
    }
  });

  onChange = ({ window, screen }) => {
    setDimensions({
      window, screen
    })
  }

  useEffect(() => {
    Dimensions.addEventListener(change, onChange)

    return () => {
      Dimensions.removeEventListener(change, onChange)
    }
  })

  return {
    window, screen
  }
}