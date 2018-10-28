import React, { useEffect } from 'react'
import { Clipboard } from 'react-native'

export default () => {
  const [value, setValue] = React.useState(null)

  useEffect(() => {
    const newValue = await Clipboard.getString()
    setValue(newValue)
  })

  return value
}
