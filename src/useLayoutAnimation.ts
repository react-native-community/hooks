import {useEffect} from 'react'
import {
  LayoutAnimation,
  Platform,
  UIManager,
  LayoutAnimationConfig,
} from 'react-native'

/**
 * A custom hook that allows you to easily and automatically animate the next set of layout changes.
 * It uses `LayoutAnimation` under the hood. This allows you to automatically animate:
 * update, delete, move, add animations.
 *
 * IMPORTANT NOTE:
 *
 * In order for this to work properly in lists you need to ensure your `key` value is unique!
 *
 */
const useLayoutAnimation = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  /**
   * Schedules an animation to happen on the next layout.
   * @param config
   * Specifies animation properties: duration in milliseconds create,
   * config for animating in new views (see Anim type) update,
   * config for animating views that have been update (see Anim type).
   * If no value is provided, a default `easeInEaseOut` preset is used.
   *
   * @param onAnimationDidEnd — Called when the animation finished. Only supported on iOS.
   */
  const animateNext = (
    config: LayoutAnimationConfig = LayoutAnimation.Presets.easeInEaseOut,
    onAnimationDidEnd?: (() => void) | undefined,
  ) => {
    LayoutAnimation.configureNext(config, onAnimationDidEnd)
  }

  return {animateNext}
}

export default useLayoutAnimation
