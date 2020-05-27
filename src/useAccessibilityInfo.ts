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
): boolean | undefined {
  const [isEnabled, setIsEnabled] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (!AccessibilityInfo[initializerName]) {
      return
    }

    AccessibilityInfo[initializerName]().then(setIsEnabled)
    AccessibilityInfo.addEventListener(eventName, setIsEnabled)

    return () => AccessibilityInfo.removeEventListener(eventName, setIsEnabled)
  }, [eventName, initializerName])

  return isEnabled
}

export function useAccessibilityInfo(): {
  screenReaderEnabled: boolean | undefined
  boldTextEnabled: boolean | undefined
  grayscaleEnabled: boolean | undefined
  invertColorsEnabled: boolean | undefined
  reduceMotionEnabled: boolean | undefined
  reduceTransparencyEnabled: boolean | undefined
} {
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
