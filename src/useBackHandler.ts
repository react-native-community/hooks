import {useEffect, DependencyList} from 'react'
import {BackHandler} from 'react-native'

export function useBackHandler(handler: () => boolean, deps?: DependencyList) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
