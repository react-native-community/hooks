import React, { useEffect, useState } from 'react';
import { InteractionManager } from 'react-native';

export default () => {
  const [complete, updateInteractionStatus] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      updateInteractionStatus(true);
    });
  });
  return complete;
};
