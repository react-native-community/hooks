import {useEffect, useState} from 'react'
import {Image, ImageRequireSource} from 'react-native'

export interface URISource {
  uri: string
}

/**
 * @param source either a remote URL or a local file resource.
 * @returns original image width and height.
 */
function useImageDimensions(source: ImageRequireSource | URISource) {
  const [state, setState] = useState<{
    width?: number
    height?: number
    loading?: boolean
    error?: any
  }>({})
  useEffect(() => {
    if (typeof source === 'object' && typeof source.uri === 'string') {
      setState({loading: true})
      Image.getSize(
        source.uri,
        (width, height) => setState({width, height}),
        error => setState({error}),
      )
    } else if (typeof source === 'number') {
      setState(Image.resolveAssetSource(source))
    } else {
      setState({error: 'not implemented'})
    }
  }, [source])
  return state
}

export default useImageDimensions
