import {useState, useEffect} from 'react'
import NetInfo, {NetInfoState} from '@react-native-community/netinfo'

export function useNetInfo() {
  const [previousConnection, setPreviousConnection] = useState(
    {} as NetInfoState,
  )
  const [connection, setConnection] = useState({} as NetInfoState)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (Object.keys(connection).length) {
        // if connection was already set, then we are in a reconnection
        // store previous connection
        setPreviousConnection(connection)
      }
      setConnection(state)
    })
    return () => {
      // To unsubscribe to these updates:
      unsubscribe()
    }
  }, [connection])

  return {
    wasConnected: previousConnection?.isConnected,
    ...connection,
  }
}
