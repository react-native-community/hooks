import {useEffect} from 'react'
import {
  Keyboard,
  KeyboardEventListener,
  KeyboardEventName,
  KeyboardEvent,
} from 'react-native'

type EffectCallback = (
  eventType: KeyboardEventName,
  event: KeyboardEvent,
) => void

export function useKeyboardEffect(
  effect: EffectCallback,
  deps: React.DependencyList,
) {
  useEffect(() => {
    const handleKeyboardWillShow: KeyboardEventListener = (e) => {
      effect('keyboardWillShow', e)
    }
    const handleKeyboardDidShow: KeyboardEventListener = (e) => {
      effect('keyboardDidShow', e)
    }
    const handleKeyboardWillHide: KeyboardEventListener = (e) => {
      effect('keyboardWillHide', e)
    }
    const handleKeyboardDidHide: KeyboardEventListener = (e) => {
      effect('keyboardDidHide', e)
    }

    Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow)
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide)
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow)
      Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow)
      Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide)
      Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
