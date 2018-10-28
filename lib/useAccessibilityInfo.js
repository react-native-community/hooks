import React, { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

export default () => {
  const [screenReaderEnabled, updateScreenReaderInfo] = useState(null)

  const [isInitialized, initialize] = useState(false)

  useEffect(() => {
    if (!isInitialized) {
      AccessibilityInfo.fetch().then((isEnabled) => {
        updateScreenReaderInfo(isEnabled)
        initialize(true)
      })
    }
  })

  function onChange(isEnabled) {
    updateScreenReaderInfo(isEnabled)
  }

  useEffect(() => {
    AccessibilityInfo.addEventListener('change', onChange)
    
    return () => AccessibilityInfo.removeEventListener('change', onChange)
  })

  return screenReaderEnabled
}