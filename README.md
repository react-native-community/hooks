![React Native Hooks](reactnativehooks.jpg)

## React Native Hooks
React Native APIs turned into React Hooks allowing you to access asynchronous APIs directly in your functional components.

> Note: You must use React Native >= 0.59.0

To get started with hooks in React Native right away, follow the instructions on [this](https://github.com/facebook/react-native/issues/21967#issuecomment-434113687) thread.

### Installation with npm

```sh
npm install react-native-hooks
```

Installation with yarn
```sh
yarn add react-native-hooks
```

## API
- [useAccessibilityInfo](https://github.com/react-native-community/react-native-hooks#useaccessibilityinfo)
- [useAppState](https://github.com/react-native-community/react-native-hooks#useappstate)
- [useCameraRoll](https://github.com/react-native-community/react-native-hooks#usecameraroll)
- [useClipboard](https://github.com/react-native-community/react-native-hooks#useclipboard)
- [useDimensions](https://github.com/react-native-community/react-native-hooks#usedimensions)
- [useKeyboard](https://github.com/react-native-community/react-native-hooks#usekeyboard)
- [useInteractionManager](https://github.com/react-native-community/react-native-hooks#useinteractionmanager)
- [useDeviceOrientation](https://github.com/react-native-community/react-native-hooks#usedeviceorientation)


### `useAccessibilityInfo`

```js
import { useAccessibilityInfo } from 'react-native-hooks'

const isScreenReaderEnabled = useAccessibilityInfo()
```

### `useAppState`

```js
import { useAppState } from 'react-native-hooks'

const currentAppState = useAppState()
```

### `useCameraRoll`

```js
import { useCameraRoll } from 'react-native-hooks'

const [photos, getPhotos, saveToCameraRoll] = useCameraRoll()

{
  photos.map((photo, index) => /* render photos */)
}

<Button title='Get Photos' onPress={() => getPhotos()}>Get Photos</Button>
```

### `useClipboard`

```js
import { useClipboard } from 'react-native-hooks'

const [data, setString] = useClipboard()

<Text>{data}</Text>

<Button title='Update Clipboard' onPress={() => setString('new clipboard data')}>Set Clipboard</Button>
```

### `useDimensions`

```js
import { useDimensions } from 'react-native-hooks'

const dimensions = useDimensions()
```

### `useKeyboard`

```js
import { useKeyboard } from 'react-native-hooks'

const keyboard = useKeyboard()

<<<<<<< HEAD
console.log('keyboard show: ', keyboard.isKeyboardShow)
console.log('keyboard height: ', keyboard.keyboardHeight)
=======
console.log('keyboard isKeyboardShow: ', keyboard.isKeyboardShow)
console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)
>>>>>>> cc65860b67d810b6422ecc70c058ad43a9d2b2a0
```

### `useInteractionManager`

```js
import { useInteractionManager } from 'react-native-hooks'

const interactionReady = useInteractionManager()

console.log('interaction ready: ', interactionReady)
```

### `useDeviceOrientation`

```js
import { useDeviceOrientation } from 'react-native-hooks'

const orientation = useDeviceOrientation()

console.log('is orientation portrait: ', orientation.portrait)
console.log('is orientation landscape: ', orientation.landscape)
```

### `useLayout`

```js
import { useLayout } from 'react-native-hooks'

const {x, y, width, height, onLayout}  = useLayout()

<View onLayout={onLayout}>
  <View style={{width: width, height: width, backgroundColor: 'red'}} />
  <View style={{width: width, height: width, backgroundColor: 'green'}} />
</View>
```
