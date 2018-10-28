import React, { useEffect } from 'react'
import { NetInfo, Platform } from 'react-native'

export default () => {
  const [netInfo, setNetInfo] = React.useState({
    type: null, effectiveType: null
  })

  const [isInitialized, initialize] = React.useState(false)

  onChange = (newState) => {
    setNetInfo({
      ...netInfo, ...newState
    })
  }

  useEffect(() => {
    if (!isInitialized) {
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        setNetInfo(connectionInfo)
        initialize(true)
      })
    }
  })

  useEffect(() => {
    NetInfo.addEventListener('connectionChange', onChange)

    return () => {
      NetInfo.removeEventListener('connectionChange', onChange)
    }
  })

  return netInfo
}