import {
  AppState,
  AppStateStatus,
  ScaledSize,
  KeyboardStatic,
  GetPhotosReturnType
} from "react-native";

declare function useDimensions(): { window: ScaledSize; screen: ScaledSize };
declare function useAppState(): AppStateStatus;
declare function useBackHandler(handler: () => boolean);
declare function useCameraRoll(): {
  photos: GetPhotosReturnType;
  getPhotos: (config?: { first: number; groupTypes: string }) => Promise<void>;
  saveToCameraRoll: (tag: any, type: any) => Promise<void>;
};
declare function useClipboard(): {
  data: string;
  setString: (content: string) => void;
};
declare function useAccessibilityInfo(): boolean;
declare function useKeyboard(): KeyboardStatic;
declare function useInteractionManager(): boolean;
declare function useDeviceOrientation(): {
  portrait: boolean;
  landscape: boolean;
};
declare function useLayout(): {
  x: number;
  y: number;
  width: number;
  height: number;
  onLayout: (event: {
    nativeEvent: {
      layout: { x: number; y: number; width: number; height: number };
    };
  }) => void;
};
