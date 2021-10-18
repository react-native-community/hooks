import {useDimensions} from './useDimensions'
import {act, renderHook} from '@testing-library/react-hooks'

// @ts-expect-error - untyped implementation
import RCTDeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter'

describe('useDimensions', () => {
  const defaultDimensionsMock = {
    screen: {fontScale: 2, height: 1334, scale: 2, width: 750},
    window: {fontScale: 2, height: 1334, scale: 2, width: 750},
  }

  const emitChangeDimensions = ({
    window = defaultDimensionsMock.window,
    screen = defaultDimensionsMock.screen,
  }) => RCTDeviceEventEmitter.emit('didUpdateDimensions', {window, screen})

  it('should return device dimensions', () => {
    const {result} = renderHook(() => useDimensions())

    expect(result.current).toEqual(defaultDimensionsMock)
  })

  it('should update dimensions when they change', () => {
    const newWindow = {...defaultDimensionsMock.window, height: 600}
    const {result} = renderHook(() => useDimensions())

    const {height: initialHeight} = result.current.window

    act(() => emitChangeDimensions({window: newWindow}))

    const {height: afterUpdateHeight} = result.current.window

    expect({
      initialHeight,
      afterUpdateHeight,
    }).toEqual({
      initialHeight: 1334,
      afterUpdateHeight: 600,
    })
  })
})
