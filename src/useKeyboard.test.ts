import {useKeyboard} from './useKeyboard'
import {act, renderHook} from '@testing-library/react-hooks'
import {Keyboard} from 'react-native'

describe('useKeyboard', () => {
  const mockCoords = {screenX: 0, screenY: 0, width: 0, height: 0}
  const emitKeyboardEvent = ({
    show = true,
    startCoordinates = mockCoords,
    endCoordinates = mockCoords,
  }) => {
    const mockEvent = {startCoordinates, endCoordinates}

    Keyboard.emit(
      show ? 'keyboardDidShow' : 'keyboardDidHide',
      show ? mockEvent : null,
    )
  }

  describe('setKeyboardHeight: number', () => {
    it('keyboard height is zero by default', () => {
      const {result} = renderHook(() => useKeyboard())

      expect(result.current.keyboardHeight).toBe(0)
    })

    it('should update keyboard height when keyboard will open', () => {
      const height = 123
      const {result} = renderHook(() => useKeyboard())

      act(() => {
        emitKeyboardEvent({show: true, endCoordinates: {...mockCoords, height}})
      })

      expect(result.current.keyboardHeight).toBe(height)
    })

    it('should reset keyboard height when keyboard will close', () => {
      const height = 123
      const {result} = renderHook(() => useKeyboard())

      act(() => {
        emitKeyboardEvent({show: true, endCoordinates: {...mockCoords, height}})
      })

      expect(result.current.keyboardHeight).toBe(height)

      act(() => {
        emitKeyboardEvent({show: false})
      })

      expect(result.current.keyboardHeight).toBe(0)
    })
  })

  describe('keyboardShown: boolean', () => {
    it('keyboard closed by default', () => {
      const {result} = renderHook(() => useKeyboard())

      expect(result.current.keyboardShown).toBe(false)
    })

    it('should set keyboardShown when keyboard will open', () => {
      const {result} = renderHook(() => useKeyboard())
      const {keyboardShown: initial} = result.current

      act(() => {
        emitKeyboardEvent({show: true})
      })

      const {keyboardShown: afterOpen} = result.current

      expect({initial, afterOpen}).toEqual({initial: false, afterOpen: true})
    })

    it('should reset keyboardShown when keyboard will close', () => {
      const {result} = renderHook(() => useKeyboard())
      const {keyboardShown: initial} = result.current

      act(() => {
        emitKeyboardEvent({show: true})
      })

      const {keyboardShown: afterOpen} = result.current

      act(() => {
        emitKeyboardEvent({show: false})
      })

      const {keyboardShown: afterClose} = result.current

      expect({initial, afterOpen, afterClose}).toEqual({
        initial: false,
        afterOpen: true,
        afterClose: false,
      })
    })
  })
})
