import {
  ScaledSize,
  AppStateStatus,
  GetPhotosReturnType,
  GetPhotosParamType,
  ScreenRect,
  LayoutChangeEvent,
  LayoutRectangle
} from 'react-native'

export interface AccessibilityInfo {
  reduceMotionEnabled: boolean
  screenReaderEnabled: boolean
}

export interface Dimensions {
  window: ScaledSize
  screen: ScaledSize
}

export interface Keyboard {
  keyboardShown: boolean
  coordinates: ScreenRect
}

export interface Orientations {
  portrait: boolean
  landscape: boolean
}

export interface LayoutHelpers extends LayoutRectangle {
  onLayout: (event: LayoutChangeEvent) => void
}

declare module 'react-native-hooks' {
  export function useDimensions(): Dimensions

  export function useAppState(): AppStateStatus

  export function useBackHandler(handler: () => void): void

  export function useCameraRoll(): (
    | GetPhotosReturnType
    | ((config?: GetPhotosParamType) => Promise<void>)
    | ((tag: string, type?: 'photo' | 'video') => Promise<void>)
  )[]

  export function useClipboard(): (string | ((content: string) => void))[]

  export function useAccessibilityInfo(): AccessibilityInfo

  export function useKeyboard(): Keyboard

  export function useInteractionManager(): boolean

  export function useDeviceOrientation(): Orientations

  export function useLayout(): LayoutHelpers
}
