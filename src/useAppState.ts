import  { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export default () => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

    useEffect(() => {
    const onChange = (appStateStatus: AppStateStatus) => {
      setAppState(appStateStatus);
    };

    AppState.addEventListener('change', onChange);

    return () => {
      AppState.removeEventListener('change', onChange);
    };
  }, []);

  return appState;
};
