import React, { useEffect } from 'react'
import { NetInfo } from 'react-native'

const inititalState = {
  type: null, effectiveType: null
}

export default () => {
  const [netInfo, setNetInfo] = React.useState(inititalState)

  onChange = (newState) => {
    setNetInfo(newState)
  }

  useEffect(() => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      setNetInfo(connectionInfo)
    })
  }, [])

  useEffect(() => {
    NetInfo.addEventListener('connectionChange', onChange)

    return () => {
      NetInfo.removeEventListener('connectionChange', onChange)
    }
  }, [])

  return netInfo
}