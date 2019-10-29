import React, { useEffect, useState } from "react";

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
};

export default (positionOptions = {}) => {
  const [position, setPosition] = useState(initialState);

  useEffect(() => {
    // @ts-ignore TODO: add types
    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  useEffect(() => {
    // @ts-ignore TODO: add types
    const listener = navigator.geolocation.watchPosition(
      success,
      failure,
      positionOptions
    );

    // @ts-ignore TODO: add types
    return () => navigator.geolocation.clearWatch(listener);
  }, []);

  function success(data: any) {
    setPosition(data);
  }

  function failure(err: Error) {
    console.log("error setting coordinates: ", err);
  }

  function setRNConfiguration(config: any) {
    // @ts-ignore TODO: add types
    navigator.geolocation.setRNConfiguration(config);
  }

  function stopObserving() {
    // @ts-ignore TODO: add types
    navigator.geolocation.stopObserving();
  }

  return [position, stopObserving, setRNConfiguration];
};
