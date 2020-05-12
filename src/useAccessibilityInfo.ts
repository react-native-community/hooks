import {useEffect, useState} from 'react'
import {AccessibilityInfo, AccessibilityEvent} from 'react-native'

type AccessibilityEventName =
  | 'boldTextChanged' // iOS-only Event
  | 'grayscaleChanged' // iOS-only Event
  | 'invertColorsChanged' // iOS-only Event
  | 'reduceMotionChanged'
  | 'screenReaderChanged'
  | 'reduceTransparencyChanged' // iOS-only Event

type AccessibilityInfoStaticInitializers =
  | 'isBoldTextEnabled'
  | 'isScreenReaderEnabled'
  | 'isGrayscaleEnabled'
  | 'isInvertColorsEnabled'
  | 'isReduceMotionEnabled'
  | 'isReduceTransparencyEnabled'

type AccessibilityEventToInfoStaticKeyMap = {
  [K in AccessibilityEventName]?: AccessibilityInfoStaticInitializers
}

const EVENT_NAME_TO_INITIALIZER: AccessibilityEventToInfoStaticKeyMap = {
  boldTextChanged: 'isBoldTextEnabled',
  screenReaderChanged: 'isScreenReaderEnabled',
  grayscaleChanged: 'isGrayscaleEnabled',
  invertColorsChanged: 'isInvertColorsEnabled',
  reduceMotionChanged: 'isReduceMotionEnabled',
  reduceTransparencyChanged: 'isReduceTransparencyEnabled',
}

type AccessibilityInfoChangeEventHandler = (event: AccessibilityEvent) => void

function useAccessibilityStateListener(
  eventName: AccessibilityEventName,
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
      <AccessibilityInfoChangeEventHandler>setIsEnabled,
    )

    return () =>
      AccessibilityInfo.removeEventListener(
        eventName,
        <AccessibilityInfoChangeEventHandler>setIsEnabled,
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
