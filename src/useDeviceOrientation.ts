import {useEffect, useState, useCallback} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

const screen = Dimensions.get('screen')

export function useDeviceOrientation() {
  const isOrientationPortrait = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => height >= width
  const isOrientationLandscape = ({
    width,
    height,
  }: {
    width: number
    height: number
  }) => width >= height

  const [orientation, setOrientation] = useState({
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen),
  })

  const onChange = useCallback(({screen: scr}: {screen: ScaledSize}) => {
    setOrientation({
      portrait: isOrientationPortrait(scr),
      landscape: isOrientationLandscape(scr),
    })
  }, [])

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [orientation.portrait, orientation.landscape, onChange])

  return orientation
}
