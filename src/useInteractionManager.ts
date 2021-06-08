import {useEffect, useState} from 'react'
import {InteractionManager} from 'react-native'

export function useInteractionManager() {
  const [complete, updateInteractionStatus] = useState(false)

  useEffect(() => {
    const {cancel} = InteractionManager.runAfterInteractions(() => {
      updateInteractionStatus(true)
    })

    return () => {
      cancel?.()
    }
  }, [])

  return complete
}
