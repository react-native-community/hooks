import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

/**
 * Gets dimensions and sets up a listener that will change the dimensions
 * if the user changes device orientation.
 */
export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get("window"),
    screen: Dimensions.get("screen"),
  });

  useEffect(() => {
    const onChange = ({ window, screen }) => {
      setDimensions({ window, screen });
    };

    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  return dimensions;
}
