import {renderHook} from '@testing-library/react-hooks'
import NetInfo from '@react-native-community/netinfo'
import {useNetInfo} from './useNetInfo'

jest.mock('@react-native-community/netinfo')

describe('useNetInfo', () => {
  const addEventListenerMock = NetInfo.addEventListener as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should add net info listener on mount', () => {
    const {result} = renderHook(() => useNetInfo())

    expect(addEventListenerMock).toBeCalledTimes(1)
    // should return default state
    expect(result.current.wasConnected).toBeUndefined()
    expect(result.current.isConnected).toBeDefined()
    expect(result.current).toBeInstanceOf(Object)
  })

  it('should resubscribe when passed handler will change', () => {
    const {result} = renderHook(() => useNetInfo())

    expect(addEventListenerMock).toBeCalledTimes(2)

    expect(result.current.wasConnected).toBeDefined()
    expect(result.current.isConnected).toBeDefined()
    expect(result.current).toBeInstanceOf(Object)
  })
})
