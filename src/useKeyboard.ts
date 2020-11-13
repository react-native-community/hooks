import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, ScreenRect} from 'react-native'

export type KeyboardAnimationType = 'show' | 'hide'
interface KeyboardAnimationEvent {
  active: boolean
  duration: number
  type: KeyboardAnimationType
}

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
})
const initialCoordinates = {
  start: emptyCoordinates,
  end: emptyCoordinates,
}

const initialAnimation: KeyboardAnimationEvent = {
  active: false,
  duration: 0,
  type: 'show',
}

export function useKeyboard() {
  const [shown, setShown] = useState(false)
  const [animation, setAnimation] = useState<KeyboardAnimationEvent>(
    initialAnimation,
  )
  const [coordinates, setCoordinates] = useState<{
    start: ScreenRect
    end: ScreenRect
  }>(initialCoordinates)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setAnimation({active: true, duration: e.duration, type: 'show'})
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true)
    setAnimation({active: false, duration: e.duration, type: 'show'})
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    setKeyboardHeight(e.endCoordinates.height)
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setAnimation({active: true, duration: e.duration, type: 'hide'})
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false)
    if (e) {
      setAnimation({active: false, duration: e.duration, type: 'hide'})
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates})
    } else {
      setAnimation(initialAnimation)
      setCoordinates(initialCoordinates)
      setKeyboardHeight(0)
    }
  }

  useEffect(() => {
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
  }, [])

  return {
    keyboardShown: shown,
    coordinates,
    animation,
    keyboardHeight,
  }
}
