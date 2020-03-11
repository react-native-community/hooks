import {useCallback, useEffect, useState} from 'react'
import {Clipboard} from 'react-native'

export default function useClipBoard() {
  const [data, updateClipboardData] = useState('')

  useEffect(() => {
    async function updateClipboard() {
      const content = await Clipboard.getString()
      updateClipboardData(content)
    }
    updateClipboard()
  }, [])

  const setString = useCallback((content: string) => {
    Clipboard.setString(content)
    updateClipboardData(content)
  }, [])

  return [data, setString]
}
