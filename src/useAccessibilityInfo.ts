import {useEffect, useState} from 'react'
import {AccessibilityInfo, AccessibilityChangeEventName} from 'react-native'

type AccessibilityInfoStaticInitializers =
  | 'isBoldTextEnabled'
  | 'isScreenReaderEnabled'
  | 'isGrayscaleEnabled'
  | 'isInvertColorsEnabled'
  | 'isReduceMotionEnabled'
  | 'isReduceTransparencyEnabled'

function useAccessibilityStateListener(
  eventName: AccessibilityChangeEventName,
  initializerName: AccessibilityInfoStaticInitializers,
) {
  const [isEnabled, setIsEnabled] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!AccessibilityInfo[initializerName]) {
      return
    }

    AccessibilityInfo[initializerName]().then(setIsEnabled)

    const subscription = AccessibilityInfo.addEventListener(
      eventName,
      setIsEnabled,
    )

    return () => {
      // @ts-expect-error - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-expect-error - need update @types/react-native@0.65.x
        subscription.remove()
      } else {
        // React Native < 0.65
        AccessibilityInfo.removeEventListener(eventName, setIsEnabled)
      }
    }
  }, [eventName, initializerName])

  return isEnabled
}

export function useAccessibilityInfo() {
  const boldTextEnabled = useAccessibilityStateListener(
    'boldTextChanged',
    'isBoldTextEnabled',
  )
  const grayscaleEnabled = useAccessibilityStateListener(
    'grayscaleChanged',
    'isGrayscaleEnabled',
  )
  const invertColorsEnabled = useAccessibilityStateListener(
    'invertColorsChanged',
    'isInvertColorsEnabled',
  )
  const reduceMotionEnabled = useAccessibilityStateListener(
    'reduceMotionChanged',
    'isReduceMotionEnabled',
  )
  const reduceTransparencyEnabled = useAccessibilityStateListener(
    'reduceTransparencyChanged',
    'isReduceTransparencyEnabled',
  )
  const screenReaderEnabled = useAccessibilityStateListener(
    'screenReaderChanged',
    'isScreenReaderEnabled',
  )

  return {
    screenReaderEnabled,
    grayscaleEnabled,
    invertColorsEnabled,
    reduceMotionEnabled,
    reduceTransparencyEnabled,
    boldTextEnabled,
  }
}
