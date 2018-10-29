import React, { useEffect, useState } from 'react'
import { Clipboard } from 'react-native'

export default () => {
  const [data, updateClipboardData] = useState('')

  useEffect(async () => {
    const content = await Clipboard.getString()
    updateClipboardData(content)
  }, [])

  function setString(content) {
    Clipboard.setString(content)
    updateClipboardData(content)
  }

  return [data, setString]
}
