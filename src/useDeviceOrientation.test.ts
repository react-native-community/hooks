import {useDeviceOrientation} from './useDeviceOrientation'
import {act, renderHook} from '@testing-library/react-hooks'

// @ts-expect-error - untyped implementation
import RCTDeviceEventEmitter from 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter'
import {Dimensions} from 'react-native'

describe('useDeviceOrientation', () => {
  const emitChangeDimensions = (screen = {width: 0, height: 0}) =>
    RCTDeviceEventEmitter.emit('didUpdateDimensions', {screen})

  const rotatePortrait = () => emitChangeDimensions({height: 200, width: 100})
  const rotateLandscape = () => emitChangeDimensions({height: 100, width: 200})

  it('should return portrait orientation', () => {
    const {result} = renderHook(() => useDeviceOrientation())

    act(() => rotatePortrait())

    expect(result.current).toEqual({
      landscape: false,
      portrait: true,
    })
  })

  it('should return landscape orientation', () => {
    const {result} = renderHook(() => useDeviceOrientation())

    act(() => rotateLandscape())

    expect(result.current).toEqual({
      landscape: true,
      portrait: false,
    })
  })

  it('should return landscape & portrait orientations when window is square', () => {
    const {result} = renderHook(() => useDeviceOrientation())

    act(() => emitChangeDimensions({width: 100, height: 100}))

    expect(result.current).toEqual({
      landscape: true,
      portrait: true,
    })
  })

  it('should use latest screen size for orientation state initialization', () => {
    Dimensions.get('screen')

    rotateLandscape()

    const {result} = renderHook(() => useDeviceOrientation())

    expect(result.current).toEqual({
      landscape: true,
      portrait: false,
    })
  })
})
