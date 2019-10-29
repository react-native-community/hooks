import { useEffect, useState } from 'react'
import { AccessibilityInfo, AccessibilityEvent } from 'react-native'


export default () => {
  const [screenReaderEnabled, updateScreenReaderInfo] = useState<AccessibilityEvent|null>(null)


  useEffect(() => {
    AccessibilityInfo.fetch().then((isEnabled: AccessibilityEvent) => {
      updateScreenReaderInfo(isEnabled)
    })
  }, [])

  function onChange(isEnabled: AccessibilityEvent) {
    updateScreenReaderInfo(isEnabled)
  }

  useEffect(() => {
    AccessibilityInfo.addEventListener('change', onChange)

    return () => AccessibilityInfo.removeEventListener('change', onChange)
  }, [])

  return screenReaderEnabled
}
