import {useEffect, useState} from 'react'
import {InteractionManager} from 'react-native'

export function useInteractionManager() {
  const [complete, updateInteractionStatus] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      updateInteractionStatus(true)
    })
  }, [])
  return complete
}
