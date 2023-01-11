import {Keyboard, Platform} from 'react-native'

export interface KeyboardReleaseReturns {
  shouldSetResponse: () => boolean
  onRelease: () => void
}

export function useKeyboardRelease(): KeyboardReleaseReturns {
  const shouldSetResponse = () => (Platform.OS === 'web' ? false : true)
  const onRelease = () => Keyboard.dismiss()

  return {onRelease, shouldSetResponse}
}
