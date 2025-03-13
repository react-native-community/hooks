import {useEffect, useState} from 'react'
import {Linking} from 'react-native'

const useLinking = () => {
  const [deepLink, setDeepLink] = useState<string | null>(null)

  const handleURLChange = (event: {url: string}) => {
    setDeepLink(event.url)
  }

  useEffect(() => {
    Linking.getInitialURL().then((url: string) => setDeepLink(url))
  }, [])

  useEffect(() => {
    const listener = Linking.addEventListener('url', handleURLChange)

    return () => listener.remove()
  }, [])

  return {deepLink}
}

export {useLinking}
