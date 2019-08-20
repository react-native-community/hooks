import React, { useState } from 'react'
import {
  CameraRoll
} from 'react-native'

const initialState = {
  edges: [],
  page_info: {
    end_cursor: '',
    has_next_page: null,
    start_cursor: ''
  }
}

const defaultConfig = {
  first: 20,
  groupTypes: 'All'
}

export default function useCameraRoll() {
  const [photos, setPhotos] = useState(initialState)

  async function getPhotos(config = defaultConfig) {
    try {
      const photos = await CameraRoll.getPhotos(config)
      setPhotos(photos)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function saveToCameraRoll(tag, type) {
    try {
      await CameraRoll.saveToCameraRoll(tag, type)
    } catch (err) {
      console.log('error saving to camera roll: ', err)
    }
  }

  return [photos, getPhotos, saveToCameraRoll]
}