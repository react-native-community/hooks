import {useBackHandler} from './useBackHandler'
import {renderHook} from '@testing-library/react-hooks'
import {BackHandler} from 'react-native'

const removeEventListenerMock = jest.fn()

jest.mock('react-native', () => ({
  BackHandler: {
    addEventListener: jest.fn().mockImplementation(() => {
      return {
        remove: removeEventListenerMock,
      }
    }),
  },
}))

describe('useBackHandler', () => {
  const addEventListenerMock = BackHandler.addEventListener as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should add back press listener on mount', () => {
    const handler = jest.fn()

    renderHook((props) => useBackHandler(props.handler), {
      initialProps: {handler},
    })

    expect(addEventListenerMock).toBeCalledTimes(1)
    expect(addEventListenerMock).toBeCalledWith('hardwareBackPress', handler)
  })

  it('should resubscribe when passed handler will change', () => {
    const handler = jest.fn()
    const handler2 = jest.fn()

    const {rerender} = renderHook((props) => useBackHandler(props.handler), {
      initialProps: {handler},
    })

    expect(addEventListenerMock).toBeCalledWith('hardwareBackPress', handler)

    rerender({handler: handler2})

    expect(removeEventListenerMock).toBeCalledTimes(1)
    expect(addEventListenerMock).toBeCalledWith('hardwareBackPress', handler2)
  })

  it('should remove back press listener on unmount', () => {
    const handler = jest.fn()

    const {unmount} = renderHook((props) => useBackHandler(props.handler), {
      initialProps: {handler},
    })

    expect(removeEventListenerMock).toBeCalledTimes(0)

    unmount()

    expect(removeEventListenerMock).toBeCalledTimes(1)
  })
})
