import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

class Dimensions {
  width: number
  height: number
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }
  /**
   * width to height ratio
   */
  get aspectRatio() {
    return this.width / this.height
  }
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width, height and aspect ratio).
 */
export function useImageDimensions(source: ImageRequireSource | URISource) {
  const [[dimensions, error], setState] = useState<[Dimensions?, Error?]>([])

  useEffect(() => {
    try {
      if (typeof source === 'number') {
        const {width, height} = Image.resolveAssetSource(source)
        setState([new Dimensions(width, height)])
      } else if (typeof source === 'object' && source.uri) {
        setState([])
        Image.getSize(
          source.uri,
          (width, height) => setState([new Dimensions(width, height)]),
          (e) => setState([undefined, e]),
        )
      } else {
        throw new Error('not implemented')
      }
    } catch (e) {
      setState([undefined, e])
    }
  }, [source])

  return {
    dimensions,
    error,
    loading: !dimensions && !error,
  }
}
