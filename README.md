![React Native Hooks](reactnativehooks.jpg)

## React Native Hooks
React Native APIs turned into React Hooks allowing you to access asynchronous APIs directly in your functional components.

> Note: This is an experimental library. As of this time React Native does not yet support React version 16.7 out of the box. 

To get started with hooks in React Native right away, follow the instructions on [this](https://github.com/facebook/react-native/issues/21967#issuecomment-434113687) thread.

### With npm

```sh
npm install react-native-hooks
```

With yarn
```sh
yarn add react-native-hooks
```

## API
- [useAccessibilityInfo](https://github.com/react-native-community/react-native-hooks#useaccessibilityinfo)
- [useAppState](https://github.com/react-native-community/react-native-hooks#useappstate)
- [useCameraRoll](https://github.com/react-native-community/react-native-hooks#usecameraroll)
- [useClipboard](https://github.com/react-native-community/react-native-hooks#useclipboard)
- [useDimensions](https://github.com/react-native-community/react-native-hooks#usedimensions)
- [useGeolocation](https://github.com/react-native-community/react-native-hooks#usegeolocation)
- [useNetInfo](https://github.com/react-native-community/react-native-hooks#usenetinfo)
- [useKeyboard](https://github.com/react-native-community/react-native-hooks#usekeyboard)


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

<Button title='Get Photos" onPress={() => getPhotos()}>Get Photos</Button>
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

### `useGeolocation`

```js
import { useGeolocation } from 'react-native-hooks'

const [position, stopObserving, setRNConfiguration] = useGeolocation()

console.log('latitude: ', position.coords.latitude)
```

### `useNetInfo`

```js
import { useNetInfo } from 'react-native-hooks'

const netInfo = useNetInfo()

console.log('netInfo type: ', netInfo.type)
```

### `useKeyboard`

```js
import { useKeyboard } from 'react-native-hooks'

const keyboard = useKeyboard()

console.log('keyboard show: ', keyboard.show)
console.log('keyboard height: ', keyboard.height)
```
