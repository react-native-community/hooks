![React Native Hooks](reactnativehooks.jpg)

## React Native Hooks

[![Version][version-badge]][package]

React Native APIs turned into React Hooks allowing you to access asynchronous APIs directly in your functional components.

> Note: You must use React Native >= 0.59.0

### Installation with npm

```sh
npm install @react-native-community/hooks
```

Installation with yarn
```sh
yarn add @react-native-community/hooks
```

## API
- [useAccessibilityInfo](https://github.com/react-native-community/react-native-hooks#useaccessibilityinfo)
- [useAppState](https://github.com/react-native-community/react-native-hooks#useappstate)
- [useBackHandler](https://github.com/react-native-community/react-native-hooks#usebackhandler)
- [useCameraRoll](https://github.com/react-native-community/react-native-hooks#usecameraroll)
- [useClipboard](https://github.com/react-native-community/react-native-hooks#useclipboard)
- [useDimensions](https://github.com/react-native-community/react-native-hooks#usedimensions)
- [useKeyboard](https://github.com/react-native-community/react-native-hooks#usekeyboard)
- [useInteractionManager](https://github.com/react-native-community/react-native-hooks#useinteractionmanager)
- [useDeviceOrientation](https://github.com/react-native-community/react-native-hooks#usedeviceorientation)
- [useLayout](https://github.com/react-native-community/react-native-hooks#uselayout)

### `useAccessibilityInfo`

```js
import { useAccessibilityInfo } from '@react-native-community/hooks'

const isScreenReaderEnabled = useAccessibilityInfo()
```

### `useAppState`

AppState will change between one of 'active', 'background', or (iOS) 'inactive' when the app is closed or put into the background.

```js
import { useAppState } from '@react-native-community/hooks'

const currentAppState = useAppState()
```

### `useBackHandler`

```js
import { useBackHandler } from '@react-native-community/hooks'

useBackHandler(() => {
  if (shouldBeHandledHere) {
    // handle it
    return true
  }
  // let the default thing happen
  return false
})
```

### `useCameraRoll`

```js
import { useCameraRoll } from '@react-native-community/hooks'

const [photos, getPhotos, saveToCameraRoll] = useCameraRoll()

{
  photos.map((photo, index) => /* render photos */)
}

<Button title='Get Photos' onPress={() => getPhotos()}>Get Photos</Button>
```

### `useClipboard`

```js
import { useClipboard } from '@react-native-community/hooks'

const [data, setString] = useClipboard()

<Text>{data}</Text>

<Button title='Update Clipboard' onPress={() => setString('new clipboard data')}>Set Clipboard</Button>
```

### `useDimensions`

Gets dimensions and sets up a listener that will change the dimensions if the user changes device orientation.

```js
import { useDimensions } from '@react-native-community/hooks'

const dimensions = useDimensions()
// or
const { width, height } = useDimensions().window
// or
const screen = useDimensions().screen
```

### `useKeyboard`

```js
import { useKeyboard } from '@react-native-community/hooks'

const keyboard = useKeyboard()

console.log('keyboard isKeyboardShow: ', keyboard.isKeyboardShow)
console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)
```

### `useInteractionManager`

```js
import { useInteractionManager } from '@react-native-community/hooks'

const interactionReady = useInteractionManager()

console.log('interaction ready: ', interactionReady)
```

### `useDeviceOrientation`

```js
import { useDeviceOrientation } from '@react-native-community/hooks'

const orientation = useDeviceOrientation()

console.log('is orientation portrait: ', orientation.portrait)
console.log('is orientation landscape: ', orientation.landscape)
```

### `useLayout`

```js
import { useLayout } from '@react-native-community/hooks'

const { onLayout, ...layout } = useLayout()

console.log('layout: ', layout)

<View onLayout={onLayout} style={{width: 200, height: 200, marginTop: 30}} />
```

[version-badge]: https://img.shields.io/npm/v/react-native-hooks.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-hooks
