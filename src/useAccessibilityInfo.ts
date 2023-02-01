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
      subscription.remove()
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
