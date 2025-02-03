import {useEffect} from 'react'
import {BackHandler} from 'react-native'

export function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler)

    return () => subscription.remove()
  }, [handler])
}
