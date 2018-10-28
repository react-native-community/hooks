import React, { useEffect } from 'react'

export default (positionOptions = {}) => {  
  const [position, setPosition] = React.useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null
  })

  success = (data) => {
    setPosition(data.coords)
  }

  failure = (err) => {
    console.log('error setting coordinates: ', err)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  useEffect(() => {
    const listener = navigator.geolocation.watchPosition(
      success,
      failure,
      positionOptions
    );

    return () => navigator.geolocation.clearWatch(listener);
  })

  return position;
};