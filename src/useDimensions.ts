import {useEffect, useState} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

export function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  })

  const onChange = ({
    window,
    screen,
  }: {
    window: ScaledSize
    screen: ScaledSize
  }) => {
    setDimensions({window, screen})
  }

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.removeEventListener('change', onChange)
  }, [])

  return dimensions
}
