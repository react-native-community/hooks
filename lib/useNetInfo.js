import React, { useEffect } from 'react'
import { NetInfo } from 'react-native'

const currentState = NetInfo.getConnectionInfo

export default () => {
  const [netInfo, setNetInfo] = React.useState(currentState)

  onChange = (newState) => {
    setNetInfo(newState)
  }

  useEffect(() => {
    NetInfo.addEventListener(change, onChange)

    return () => {
      NetInfo.removeEventListener(change, onChange)
    }
  })

  return netInfo
}