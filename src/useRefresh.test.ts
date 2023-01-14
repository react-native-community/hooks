import {act, renderHook} from '@testing-library/react-hooks'
import {useRefresh} from './useRefresh'

const DELAY_IN_MS = 300
jest.useFakeTimers()
describe('useRefresh', () => {
  it('should invoke refresh and return correct refreshing state', () => {
    const wait = () => {
      return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS))
    }

    const {result} = renderHook(() => useRefresh(wait))

    const spy = jest.spyOn(result.current, 'onRefresh')
    act(() => {
      result.current.onRefresh()
    })

    expect(result.current.isRefreshing).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
    act(() => {
      jest.advanceTimersByTime(DELAY_IN_MS)
    })

    expect(result.current.isRefreshing).toBe(false)
  })
})
