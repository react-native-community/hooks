import React, { useEffect, useState } from 'react'
import { Clipboard } from 'react-native'


export default function useClipBoard() {
  const [data, updateClipboardData] = useState('')

  async function updateClipboard() {
    const content = await Clipboard.getString()
    updateClipboardData(content);
  }

  useEffect(() => {
    updateClipboard()
  }, [])

  function setString(content: string) {
    Clipboard.setString(content)
    updateClipboardData(content)
  }

  return [data, setString]
}
