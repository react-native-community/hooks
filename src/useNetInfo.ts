import React, { useEffect, useState } from "react";
// @ts-ignore TODO: import from @react-native-community/netinfo
import { NetInfo } from "react-native";

const inititalState = {
  type: null,
  effectiveType: null
};

export default () => {
  const [netInfo, setNetInfo] = useState(inititalState);

  // @ts-ignore TODO: add types
  const onChange = newState => {
    setNetInfo(newState);
  };

  useEffect(() => {
    // @ts-ignore TODO: add types
    NetInfo.getConnectionInfo().then(connectionInfo => {
      setNetInfo(connectionInfo);
    });
  }, []);

  useEffect(() => {
    NetInfo.addEventListener("connectionChange", onChange);

    return () => {
      NetInfo.removeEventListener("connectionChange", onChange);
    };
  }, []);

  return netInfo;
};
