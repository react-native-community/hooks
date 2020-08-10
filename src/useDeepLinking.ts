import {Linking} from 'react-native'
import {useRef, useEffect} from 'react'

interface handlerParam {
  url: string
}

/**
 * @param deepLinkingHandler Function called when application is opened by a deep link
 * @param normalHandler Function called when application is NOT opened by a deep link
 */
export const useDeepLinking = (
  deepLinkingHandler: (url: string) => any,
  normalHandler?: () => any,
) => {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = deepLinkingHandler

    Linking.getInitialURL().then((url) => {
      if (url) {
        deepLinkingHandler(url)
      } else if (normalHandler) {
        normalHandler()
      }
    })
  }, [deepLinkingHandler, normalHandler])

  useEffect(() => {
    const handler = ({url}: handlerParam) => savedCallback.current(url)

    Linking.addEventListener('url', handler)

    return () => {
      Linking.removeEventListener('url', handler)
    }
  })
}
