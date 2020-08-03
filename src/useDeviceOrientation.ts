import {useEffect, useState, useCallback} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

const screen = Dimensions.get('screen')

export function useDeviceOrientation() {
  const getOrientation = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => height >= width ? 'portrait' : 'landscape'

  const [orientation, setOrientation] = useState(getOrientation(screen))

  const onChange = useCallback(({screen: scr}: {screen: ScaledSize}) => {
    setOrientation(getOrientation(scr))
  }, [])

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [onChange])

  return orientation
}
