import {Keyboard} from 'react-native'

export interface KeyboardReleaseReturns {
  shouldSetResponse: () => boolean
  onRelease: () => void
}

export function useKeyboardRelease(): KeyboardReleaseReturns {
  const shouldSetResponse = () => true
  const onRelease = () => Keyboard.dismiss()

  return {onRelease, shouldSetResponse}
}
