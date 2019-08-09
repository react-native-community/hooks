import React, { useEffect, useState } from 'react'
import { Clipboard } from 'react-native'

export default () => {
  const [data, updateClipboardData] = useState('')

  useEffect(() => {
    async function updateClipboard() {
        const content = await Clipboard.getString()
        updateClipboardData(content);
    }
    updateClipboard()
  }, [])

  function setString(content) {
    Clipboard.setString(content)
    updateClipboardData(content)
  }

  return [data, setString]
}
