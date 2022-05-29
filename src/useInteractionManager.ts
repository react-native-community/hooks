import {useEffect, useState} from 'react'
import {InteractionManager} from 'react-native'

export function useInteractionManager() {
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setComplete(true)
    })

    return () => interactionPromise.cancel()
  }, [])

  return complete
}
