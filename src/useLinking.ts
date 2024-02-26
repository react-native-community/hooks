import {useEffect, useState} from 'react'
import {Linking} from 'react-native'

const useLinking = () => {
  const [deepLink, setDeepLink] = useState<string | null>(null)

  const openLinkInBrowser = (url: string) => {
    Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
  }

  const openAppSettings = async () => await Linking.openSettings()

  const handleURLChange = (event: {url: string}) => {
    setDeepLink(event.url)
  }

  useEffect(() => {
    Linking.getInitialURL().then((url) => setDeepLink(url))
  }, [])

  useEffect(() => {
    const listener = Linking.addEventListener('url', handleURLChange)

    return () => listener.remove()
  }, [])

  return {openLinkInBrowser, openAppSettings, deepLink}
}

export {useLinking}
