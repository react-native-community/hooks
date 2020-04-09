import {useRef} from 'react'
import {Animated} from 'react-native'

export const useAnimatedValue = (initialValue: number): Animated.Value => {
  const ref = useRef(new Animated.Value(initialValue))
  return ref.current
}
