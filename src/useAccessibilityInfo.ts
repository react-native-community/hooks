import {useEffect, useState} from 'react'
import {AccessibilityInfo, AccessibilityChangeEventName} from 'react-native'

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
    AccessibilityInfo.addEventListener(
      eventName,
      setIsEnabled,
    )

    return () =>
      AccessibilityInfo.removeEventListener(
        eventName,
        setIsEnabled,
      )
  }, [eventName])

  return isEnabled
}

export function useAccessibilityInfo() {
  const screenReaderEnabled = useAccessibilityStateListener(
    'screenReaderChanged',
  )
  const grayscaleEnabled = useAccessibilityStateListener('grayscaleChanged')
  const boldTextEnabled = useAccessibilityStateListener('boldTextChanged')
  const invertColorsEnabled = useAccessibilityStateListener(
    'invertColorsChanged',
  )
  const reduceMotionEnabled = useAccessibilityStateListener(
    'reduceMotionChanged',
  )
  const reduceTransparencyEnabled = useAccessibilityStateListener(
    'reduceTransparencyChanged',
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
