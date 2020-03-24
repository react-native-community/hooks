import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image dimensions (width and height).
 */
function useImageDimensions(source: ImageRequireSource | URISource) {
  const localAsset = typeof source === 'number'
  const [dimensions, setDimensions] = useState<
    | {
        width: number
        height: number
      }
    | undefined
  >(localAsset ? Image.resolveAssetSource(source) : undefined)
  const [error, setError] = useState<Error>()
  useEffect(() => {
    if (localAsset) {
      return
    }
    try {
      Image.getSize(
        (source as URISource).uri,
        (width, height) => setDimensions({width, height}),
        e => {
          throw e
        },
      )
    } catch (e) {
      setError(e)
    }
  }, [source, localAsset])

  return {
    dimensions,
    error,
    /**
     * width to height ratio
     */
    get aspectRatio() {
      return dimensions && dimensions.width / dimensions.height
    },
    /**
     * loading indicator for remote image
     */
    get loading() {
      return !dimensions && !error
    },
  }
}

export default useImageDimensions
