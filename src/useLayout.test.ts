import {renderHook} from '@testing-library/react-hooks'

import useLayout from './useLayout'

describe('bla', () => {
  it('should increment counter', () => {
    const {result} = renderHook(() => useLayout())

    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
    expect(result.current.width).toBe(0)
    expect(result.current.height).toBe(0)
  })
})
