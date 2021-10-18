import {useImageDimensions} from './useImageDimensions'
import {act, renderHook} from '@testing-library/react-hooks'
import {Image} from 'react-native'

jest.mock('react-native', () => ({
  Image: {
    resolveAssetSource: jest.fn().mockReturnValue({width: 0, height: 0}),
    getSize: jest.fn(),
  },
}))

describe('useImageDimensions', () => {
  describe('external images', () => {
    const mockSource = {uri: 'test'}
    const getSizeMock = Image.getSize as jest.Mock

    it('should invoke getSize with with passed uri', () => {
      renderHook(() => useImageDimensions(mockSource))

      expect(getSizeMock).toBeCalledWith(
        mockSource.uri,
        expect.any(Function),
        expect.any(Function),
      )
    })

    it('should return error when cannot get image size', () => {
      const error = new Error('Ops...')

      getSizeMock.mockImplementationOnce((_, onSuccess, onError) => {
        onError(error)
      })

      const {result} = renderHook(() => useImageDimensions(mockSource))

      expect(result.current).toEqual({
        loading: false,
        error,
      })
    })

    it('should return dimensions when successfully get image size', () => {
      const width = 111
      const height = 222
      let emitOnSuccess = (() => {}) as (width: number, height: number) => void

      getSizeMock.mockImplementationOnce((_, onSuccess) => {
        emitOnSuccess = onSuccess
      })

      const {result} = renderHook(() => useImageDimensions(mockSource))

      expect(result.current).toEqual({loading: true})

      act(() => {
        emitOnSuccess(width, height)
      })

      expect(result.current).toEqual({
        loading: false,
        dimensions: {width, height, aspectRatio: 0.5},
      })
    })

    it('should update image size when source change', () => {
      let emitOnSuccess = (() => {}) as (width: number, height: number) => void

      getSizeMock.mockImplementation((_, onSuccess) => {
        emitOnSuccess = onSuccess
      })

      const {result, rerender} = renderHook(
        (props) => useImageDimensions(props.source),
        {initialProps: {source: mockSource}},
      )

      expect(result.current).toEqual({loading: true})

      act(() => emitOnSuccess(1, 2))

      expect(result.current).toEqual({
        loading: false,
        dimensions: {width: 1, height: 2, aspectRatio: 0.5},
      })

      rerender({source: {uri: 'new-uri'}})

      expect(result.current).toEqual({loading: true})

      act(() => emitOnSuccess(3, 4))

      expect(result.current).toEqual({
        loading: false,
        dimensions: {width: 3, height: 4, aspectRatio: 0.75},
      })
    })
  })

  describe('bundled up images', () => {
    const mockImage = 0 // typeof require('img.png') === 'number'
    const getResolveAssetSource = Image.resolveAssetSource as jest.Mock

    it('should invoke resolveAssetSource with passed image', () => {
      renderHook(() => useImageDimensions(mockImage))

      expect(getResolveAssetSource).toBeCalledWith(mockImage)
    })

    it('should return image dimensions', () => {
      const width = 111
      const height = 222

      getResolveAssetSource.mockReturnValueOnce({width, height})

      const {result} = renderHook(() => useImageDimensions(mockImage))

      expect(result.current).toEqual({
        loading: false,
        dimensions: {
          width,
          height,
          aspectRatio: 0.5,
        },
      })
    })

    it('should return an error when unexpected error happened', () => {
      const error = new Error('Cannot find image')

      getResolveAssetSource.mockImplementationOnce(() => {
        throw error
      })

      const {result} = renderHook(() => useImageDimensions(mockImage))

      expect(result.current).toEqual({
        loading: false,
        error,
      })
    })
  })

  it('should return an error when pass non image', () => {
    const nonImage = 'Ops )))'
    const {result} = renderHook(() =>
      useImageDimensions(
        // @ts-expect-error - non image
        nonImage,
      ),
    )

    expect(result.current).toEqual({
      loading: false,
      error: expect.any(Error),
    })
  })
})
