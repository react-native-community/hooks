import React, { useEffect, useState } from 'react'
import {
  AccessibilityInfo,
  AccessibilityChangeEvent,
  AccessibilityEvent,
} from 'react-native'

export default function useAccessibilityInfo() {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false)
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false)

  const handleReduceMotionChanged = (enabled: AccessibilityChangeEvent) =>
    setReduceMotionEnabled(enabled)
  const handleScreenReaderChanged = (enabled: AccessibilityChangeEvent) =>
    setScreenReaderEnabled(enabled)

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(handleReduceMotionChanged)
    AccessibilityInfo.isScreenReaderEnabled().then(handleScreenReaderChanged)

    AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      handleReduceMotionChanged as (event: AccessibilityEvent) => void,
    )
    AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      handleScreenReaderChanged as (event: AccessibilityEvent) => void,
    )

    return () => {
      AccessibilityInfo.removeEventListener(
        'reduceMotionChanged',
        handleReduceMotionChanged as (event: AccessibilityEvent) => void,
      )
      AccessibilityInfo.removeEventListener(
        'screenReaderChanged',
        handleScreenReaderChanged as (event: AccessibilityEvent) => void,
      )
    }
  }, [])

  return { reduceMotionEnabled, screenReaderEnabled }
}
