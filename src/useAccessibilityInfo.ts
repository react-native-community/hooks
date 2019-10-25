import React, { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'


export default () => {
  const [screenReaderEnabled, updateScreenReaderInfo] = useState(null)


  useEffect(() => {
    AccessibilityInfo.fetch().then((isEnabled) => {
      updateScreenReaderInfo(isEnabled)
    })
  }, [])

  function onChange(isEnabled) {
    updateScreenReaderInfo(isEnabled)
  }

  useEffect(() => {
    AccessibilityInfo.addEventListener('change', onChange)

    return () => AccessibilityInfo.removeEventListener('change', onChange)
  }, [])

  return screenReaderEnabled
}
