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
      // @ts-expect-error - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-expect-error - need update @types/react-native@0.65.x
        subscription.remove()
      } else {
        // React Native < 0.65
        Dimensions.removeEventListener('change', onChange)
      }
    }
  }, [])

  return dimensions
}
