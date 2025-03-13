import {Linking} from 'react-native'
import {act, renderHook} from '@testing-library/react-hooks'

import {useLinking} from './useLinking'

jest.mock('react-native', () => ({
  Linking: {
    addEventListener: jest.fn((_, fn) => ({remove: jest.fn()})),
    getInitialURL: jest.fn(() => Promise.resolve()),
    openSettings: jest.fn(() => Promise.resolve()),
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    openURL: jest.fn((url: string) => Promise.resolve()),
  },
}))

describe('useLinking', () => {
  it('should return deeplink as null', () => {
    const {result, waitForNextUpdate} = renderHook(() => useLinking())

    waitForNextUpdate()

    expect(result.current.deepLink).toBe(null)
  })

  it('calls getInitialURL with initial deeplink url', async () => {
    const url = 'app://magic_screen'
    const getInitialURLSpy = jest.spyOn(Linking, 'getInitialURL')
    getInitialURLSpy.mockResolvedValueOnce(url)

    const {result, waitForNextUpdate} = renderHook(() => useLinking())

    await waitForNextUpdate()

    expect(result.current.deepLink).toBe('app://magic_screen')
  })
})
