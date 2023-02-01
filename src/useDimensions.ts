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
    const subscription = Dimensions.addEventListener('change', onChange)

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove()
      } else {
        // @ts-expect-error - React Native < 0.65
        Dimensions.removeEventListener('change', onChange)
      }
    }
  }, [])

  return dimensions
}
