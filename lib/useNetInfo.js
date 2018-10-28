import React, { useEffect } from 'react'
import { NetInfo } from 'react-native'

export default () => {
  const [netInfo, setNetInfo] = React.useState({
    type: null, effectiveType: null, isConnectionExpensive: null,
  })

  onChange = (newState) => {
    setNetInfo({
      ...netInfo, ...newState
    })
  }

  useEffect(() => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      setNetInfo({
        ...netInfo, ...connectionInfo
      })
    });
  })

  useEffect(() => {
    NetInfo.isConnectionExpensive()
    .then(value => {
      isConnectionExpensive = value
    })
    .catch(error => {
      console.error(error);
    });
  })

  useEffect(() => {
    NetInfo.addEventListener(change, onChange)

    return () => {
      NetInfo.removeEventListener(change, onChange)
    }
  })

  return netInfo
}