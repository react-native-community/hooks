import {useEffect, useState} from 'react'
import {AccessibilityInfo, AccessibilityChangeEventName} from 'react-native'

const SUPPORTS_RN60_ACCESSIBILITY_INFO_API = !!(
  AccessibilityInfo.isGrayscaleEnabled &&
  AccessibilityInfo.isInvertColorsEnabled &&
  AccessibilityInfo.isReduceMotionEnabled &&
  AccessibilityInfo.isReduceTransparencyEnabled
)

type AccessibilityInfoStaticInitializers =
  | 'isBoldTextEnabled'
  | 'isScreenReaderEnabled'
  | 'isGrayscaleEnabled'
  | 'isInvertColorsEnabled'
  | 'isReduceMotionEnabled'
  | 'isReduceTransparencyEnabled'

type AccessibilityEventToInfoStaticKeyMap = {
  [K in AccessibilityChangeEventName]?: AccessibilityInfoStaticInitializers
}

const EVENT_NAME_TO_INITIALIZER: AccessibilityEventToInfoStaticKeyMap = {
  boldTextChanged: 'isBoldTextEnabled',
  screenReaderChanged: 'isScreenReaderEnabled',
  grayscaleChanged: 'isGrayscaleEnabled',
  invertColorsChanged: 'isInvertColorsEnabled',
  reduceMotionChanged: 'isReduceMotionEnabled',
  reduceTransparencyChanged: 'isReduceTransparencyEnabled',
}

function useAccessibilityStateListener(
  eventName: AccessibilityChangeEventName,
): boolean {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const initializerKey = EVENT_NAME_TO_INITIALIZER[eventName]

    if (!initializerKey) {
      return
    }

    AccessibilityInfo[initializerKey]().then(setIsEnabled)
    AccessibilityInfo.addEventListener(eventName, setIsEnabled)

    return () => AccessibilityInfo.removeEventListener(eventName, setIsEnabled)
  }, [eventName])

  return isEnabled
}

export function useAccessibilityInfo(): {
  screenReaderEnabled: boolean
  boldTextEnabled: boolean
  grayscaleEnabled?: boolean
  invertColorsEnabled?: boolean
  reduceMotionEnabled?: boolean
  reduceTransparencyEnabled?: boolean
} {
  const screenReaderEnabled = useAccessibilityStateListener(
    'screenReaderChanged',
  )
  const boldTextEnabled = useAccessibilityStateListener('boldTextChanged')

  if (!SUPPORTS_RN60_ACCESSIBILITY_INFO_API) {
    return {
      screenReaderEnabled,
      boldTextEnabled,
    }
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const grayscaleEnabled = useAccessibilityStateListener('grayscaleChanged')
  const invertColorsEnabled = useAccessibilityStateListener(
    'invertColorsChanged',
  )
  const reduceMotionEnabled = useAccessibilityStateListener(
    'reduceMotionChanged',
  )
  const reduceTransparencyEnabled = useAccessibilityStateListener(
    'reduceTransparencyChanged',
  )
  /* eslint-enable react-hooks/rules-of-hooks */

  return {
    screenReaderEnabled,
    grayscaleEnabled,
    invertColorsEnabled,
    reduceMotionEnabled,
    reduceTransparencyEnabled,
    boldTextEnabled,
  }
}
