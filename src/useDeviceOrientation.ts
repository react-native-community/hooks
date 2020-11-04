import {useEffect, useState, useCallback} from 'react'
import {Dimensions, ScaledSize} from 'react-native'

interface DeviceOrientation {
  portrait: boolean
  landscape: boolean
}

function calculateDeviceOrientation(screen: ScaledSize): DeviceOrientation {
  return { portrait: screen.height >= screen.width, landscape: screen.width >= screen.height }
}

export function useDeviceOrientation(): DeviceOrientation {
  const [orientation, setOrientation] = useState(calculateDeviceOrientation(Dimensions.get('screen')))

  const onChange = useCallback(({screen}: {screen: ScaledSize}) => {
    setOrientation(calculateDeviceOrientation(screen))
  }, [])

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.removeEventListener('change', onChange)
  }, [onChange])

  return orientation
}
