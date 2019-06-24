import React, { useEffect, useState, useCallback } from 'react'
import { Dimensions } from 'react-native'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

export default () => {
  const [dimensions, setDimensions] = useState({
    window, screen
  })

  const onChange = useCallback(({ window, screen }) => {
    setDimensions({ window, screen });
  }, [])

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.removeEventListener('change', onChange)
  }, [])

  return dimensions
}