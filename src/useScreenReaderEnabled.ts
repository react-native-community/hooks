import { useEffect, useState, useCallback } from 'react';
import {
  AccessibilityInfo,
  AccessibilityEvent,
  AccessibilityChangeEvent,
} from 'react-native';

export default (defaultValue = false) => {
  const [screenReaderEnabled, updateScreenReaderInfo] = useState<boolean>(
    defaultValue
  );

  const initScreenReaderInfo = useCallback(async () => {
    updateScreenReaderInfo(await AccessibilityInfo.fetch());
  }, []);

  useEffect(() => {
      initScreenReaderInfo();
    const onChange = (event: AccessibilityEvent) => {
      updateScreenReaderInfo(event as AccessibilityChangeEvent);
    };
    AccessibilityInfo.addEventListener('change', onChange);
    return () => AccessibilityInfo.removeEventListener('change', onChange);
  }, [initScreenReaderInfo]);

  return screenReaderEnabled;
};
