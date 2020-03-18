import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

type ImageDimensions = {
  width: number
  height: number
} | null
type FailureCallback = (error: any) => void

/**
 * @param source local file resource.
 * @returns Original image width and height.
 */
function useImageDimensions(source: ImageRequireSource): ImageDimensions
/**
 * @param source remote URL
 * @param failure the function that will be called if there was an error, such as failing to retrieve the image (see https://reactnative.dev/docs/image#getsize).
 * @returns Original image width and height.
 */
function useImageDimensions(
  source: URISource,
  failure?: FailureCallback,
): ImageDimensions
function useImageDimensions(
  source: ImageRequireSource | URISource,
  failure?: FailureCallback,
): ImageDimensions
function useImageDimensions(
  source: ImageRequireSource | URISource,
  failure?: FailureCallback,
) {
  const [dimensions, setDimensions] = useState<ImageDimensions>()
  useEffect(() => {
    if (typeof source === 'object') {
      const {uri} = source
      Image.getSize(
        uri,
        (width, height) => setDimensions({width, height}),
        error => {
          setDimensions(null)
          if (failure) {
            failure(error)
          } else {
            console.error(error)
          }
        },
      )
    } else {
      setDimensions(Image.resolveAssetSource(source))
    }
  }, [source, failure])
  return dimensions
}

export default useImageDimensions
