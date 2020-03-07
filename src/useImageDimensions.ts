import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}
type ImageDimensions =
  | {
      width: number
      height: number
    }
  | undefined
type FailureCallback = (error: any) => void

/**
 * @param source A local file resource.
 * @returns Original image width and height.
 */
function useImageDimensions(source: ImageRequireSource): ImageDimensions
/**
 * @param source A remote URL
 * @param failure The function that will be called if there was an error, such as failing to retrieve the image (see https://reactnative.dev/docs/image#getsize).
 * @returns Original image width and height.
 */
function useImageDimensions(
  source: URISource,
  failure: FailureCallback,
): ImageDimensions
function useImageDimensions(
  source: ImageRequireSource | URISource,
  failure: FailureCallback,
): ImageDimensions
function useImageDimensions(
  source: ImageRequireSource | URISource,
  failure?: FailureCallback,
) {
  const [dimensions, setDimensions] = useState<ImageDimensions>()
  useEffect(() => {
    if (typeof source === 'object') {
      if (!failure) {
        throw new Error(
          '"failure" callback parameter is required in case when URI source is using.',
        )
      }
      const {uri} = source
      Image.getSize(
        uri,
        (width, height) => setDimensions({width, height}),
        failure,
      )
    } else {
      setDimensions(Image.resolveAssetSource(source))
    }
  }, [source, failure])
  return dimensions
}

export default useImageDimensions
