import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
function useImageDimensions(source: ImageRequireSource | URISource) {
  const [[dimensions, error], setState] = useState<
    [{width: number; height: number}?, Error?]
  >([])

  useEffect(() => {
    try {
      if (typeof source === 'number') {
        const {width, height} = Image.resolveAssetSource(source)
        setState([{width, height}])
      } else if (typeof source === 'object' && source.uri) {
        setState([])
        Image.getSize(
          source.uri,
          (width, height) => setState([{width, height}]),
          e => setState([dimensions, e]),
        )
      } else {
        throw new Error('not implemented')
      }
    } catch (e) {
      setState([dimensions, e])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source])

  return {
    dimensions:
      dimensions &&
      (Object.setPrototypeOf(dimensions, {
        get aspectRatio(): number {
          const _this = this as any
          return _this.width / _this.height
        },
      }) as {
        /**
         * width to height ratio
         */
        readonly aspectRatio: number
        width: number
        height: number
      }),
    error,
    get loading() {
      return !this.dimensions && !this.error
    },
  }
}

export default useImageDimensions
