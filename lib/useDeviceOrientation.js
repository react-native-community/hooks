import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

export default () => {
  const [orientation, setOrientation] = useState({
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen)
  });

  isOrientationPortrait = ({ width, height }) => height >= width;
  isOrientationLandscape = ({ width, height }) => width >= height;

  onChange = ({ screen }) => {
    setOrientation({
      portrait: isOrientationPortrait(screen),
      landscape: isOrientationLandscape(screen)
    });
  };

  useEffect(
    () => {
      Dimensions.addEventListener('change', onChange);

      return () => {
        Dimensions.removeEventListener('change', onChange);
      };
    },
    [orientation.portrait, orientation.landscape]
  );

  return orientation;
};
