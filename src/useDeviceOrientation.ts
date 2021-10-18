import {useEffect, useState} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

const isOrientationPortrait = ({width, height}: ScaledSize) => height >= width
const isOrientationLandscape = ({width, height}: ScaledSize) => width >= height

export function useDeviceOrientation() {
  const screen = Dimensions.get('screen')
  const initialState = {
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen),
  }

  const [orientation, setOrientation] = useState(initialState)

  useEffect(() => {
    const onChange = ({screen}: {screen: ScaledSize}) => {
      setOrientation({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen),
      })
    }

    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return orientation
}
