import {
  AppState,
  AppStateStatus,
  ScaledSize,
  KeyboardStatic,
  GetPhotosReturnType,
  LayoutRectangle
} from "react-native";

declare function useDimensions(): { window: ScaledSize; screen: ScaledSize };
declare function useAppState(): AppStateStatus;
declare function useBackHandler(handler: () => boolean): void;
declare function useCameraRoll(): {
  photos: GetPhotosReturnType;
  getPhotos: (config?: { first: number; groupTypes: string }) => Promise<void>;
  saveToCameraRoll: (tag: string, type?: "photo" | "video") => Promise<void>;
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
declare function useLayout(): LayoutRectangle & {
  onLayout: (event: {
    nativeEvent: {
      layout: LayoutRectangle;
    };
  }) => void;
};
