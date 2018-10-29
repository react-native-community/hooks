![React Native Hooks](reactnativehooks.jpg)

## React Native Hooks
React Native APIs turned into React Hooks allowing you to access asynchrnous APIs directly in your functional components.

> Note: This is an experimental library. As of this time React Native does not yet support React version 16.7. Once support for React <= 16.7 is added to React Native, this library will be ready to use.

### With npm

```sh
npm install react-native-hooks
```

With yarn
```sh
yarn add react-native-hooks
```

## API
- [useAccessibilityInfo](https://github.com/react-native-training/react-native-hooks#useaccessibilityinfo)
- [useAppState](https://github.com/react-native-training/react-native-hooks#useappstate)
- [useCameraRoll](https://github.com/react-native-training/react-native-hooks#usecameraroll)
- [useClipboard](https://github.com/react-native-training/react-native-hooks#useclipboard)
- [useDimensions](https://github.com/react-native-training/react-native-hooks#usedimensions)
- [useGeolocation](https://github.com/react-native-training/react-native-hooks#usegeolocation)
- [useNetInfo](https://github.com/react-native-training/react-native-hooks#usenetinfo)


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

const [photos, getPhotos, saveToCameraRoll] = useAppState()

{
  photos.map((photo, index) => /* render photos */)
}

<Button onPress={() => getPhotos()}>Get Photos</Button>
```

### `useClipboard`

```js
import { useClipboard } from 'react-native-hooks'

const [data, setString] = useClipboard()

<Text>{data}</Text>

<Button onPress={() => setString('new clipboard data')}>Set Clipboard</Button>
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