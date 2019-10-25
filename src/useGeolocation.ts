import React, { useEffect, useState } from 'react'

const initialState = {
  timeStamp: null,
  coords: {
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null
  }
}

export default (positionOptions = {}) => {  
  const [position, setPosition] = useState(initialState)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, failure)
  }, [])

  useEffect(() => {
    const listener = navigator.geolocation.watchPosition(
      success,
      failure,
      positionOptions
    )

    return () => navigator.geolocation.clearWatch(listener);
  }, [])

  function success (data) {
    setPosition(data)
  }

  function failure (err) {
    console.log('error setting coordinates: ', err)
  }

  function setRNConfiguration(config) {
    navigator.geolocation.setRNConfiguration(config)
  }

  function stopObserving() {
    navigator.geolocation.stopObserving()
  }

  return [position, stopObserving, setRNConfiguration]
};