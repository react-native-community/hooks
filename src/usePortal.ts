import {useEffect, useState} from 'react'
import {Dimensions} from 'react-native'

export const usePortal = () => {
  // change state
  const [isRotation, setIsRotation] = useState<boolean>(false)

  // handle change
  const portalHandler = () => {
    const {width, height} = Dimensions.get('window')
    if (width < height) {
      setIsRotation(false)
    } else {
      setIsRotation(true)
    }
  }

  // listen screen event
  useEffect(() => {
    Dimensions.addEventListener('change', portalHandler)
  })
  return {isRotation}
}
