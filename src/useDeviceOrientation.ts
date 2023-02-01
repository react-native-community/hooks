import {useWindowDimensions} from 'react-native'

type DeviceOrientation = 'portrait' | 'landscape'

export function useDeviceOrientation(): DeviceOrientation {
  const {width, height} = useWindowDimensions()

  if (width >= height) {
    return 'landscape'
  }
  return 'portrait'
}
