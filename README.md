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
- [useAccessibilityInfo](https://github.com/react-native-community/hooks#useaccessibilityinfo)
- [useAppState](https://github.com/react-native-community/hooks#useappstate)
- [useBackHandler](https://github.com/react-native-community/hooks#usebackhandler)
- [useCameraRoll](https://github.com/react-native-community/hooks#usecameraroll)
- [useClipboard](https://github.com/react-native-community/hooks#useclipboard)
- [useDimensions](https://github.com/react-native-community/hooks#usedimensions)
- [useImageDimensions](https://github.com/react-native-community/hooks#useImageDimensions)
- [useKeyboard](https://github.com/react-native-community/hooks#usekeyboard)
- [useInteractionManager](https://github.com/react-native-community/hooks#useinteractionmanager)
- [useDeviceOrientation](https://github.com/react-native-community/hooks#usedeviceorientation)
- [useLayout](https://github.com/react-native-community/hooks#uselayout)

### `useAccessibilityInfo`

```js
import { useAccessibilityInfo } from '@react-native-community/hooks'

const {
  boldTextEnabled,
  screenReaderEnabled,
  reduceMotionEnabled, // requires RN60 or newer
  grayscaleEnabled, // requires RN60 or newer
  invertColorsEnabled, // requires RN60 or newer
  reduceTransparencyEnabled // requires RN60 or newer
} = useAccessibilityInfo()
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

### `useImageDimensions`

```js
import {useImageDimensions} from '@react-native-community/hooks'

const source = require('./assets/yourImage.png')
// or
const source = {uri: 'https://your.image.URI'}

const {dimensions, loading, error} = useImageDimensions(source)

if(loading || error || !dimensions) {
  return null
}
const {width, height, aspectRatio} = dimensions
```

### `useKeyboard`

```js
import { useKeyboard } from '@react-native-community/hooks'

const keyboard = useKeyboard()

console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
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

[version-badge]: https://img.shields.io/npm/v/@react-native-community/hooks.svg?style=flat-square
[package]: https://www.npmjs.com/package/@react-native-community/hooks

## Thanks

We use [auto](https://github.com/intuit/auto) for automatic releases, an awesome tool by an awesome [dude](https://github.com/hipstersmoothie)!

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://pavlos.dev"><img src="https://avatars2.githubusercontent.com/u/100233?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pavlos Vinieratos</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=pvinis" title="Code">💻</a> <a href="#design-pvinis" title="Design">🎨</a> <a href="https://github.com/react-native-community/hooks/commits?author=pvinis" title="Documentation">📖</a> <a href="#infra-pvinis" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-pvinis" title="Maintenance">🚧</a> <a href="https://github.com/react-native-community/hooks/commits?author=pvinis" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/melihberberolu"><img src="https://avatars3.githubusercontent.com/u/3721734?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Melih</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=melihberberolu" title="Code">💻</a> <a href="https://github.com/react-native-community/hooks/commits?author=melihberberolu" title="Documentation">📖</a> <a href="#infra-melihberberolu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/react-native-community/hooks/commits?author=melihberberolu" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://naturalclar.dev"><img src="https://avatars1.githubusercontent.com/u/6936373?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jesse Katsumata</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=Naturalclar" title="Code">💻</a> <a href="https://github.com/react-native-community/hooks/commits?author=Naturalclar" title="Documentation">📖</a> <a href="#maintenance-Naturalclar" title="Maintenance">🚧</a> <a href="https://github.com/react-native-community/hooks/commits?author=Naturalclar" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://twitter.com/webtaculars"><img src="https://avatars0.githubusercontent.com/u/11532969?v=4?s=100" width="100px;" alt=""/><br /><sub><b>abhishek gupta</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/issues?q=author%3Awebtaculars" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.linkedin.com/in/zeljko-markovic-19266344"><img src="https://avatars3.githubusercontent.com/u/2046481?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zeljko</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=zeljkoX" title="Code">💻</a></td>
    <td align="center"><a href="http://linus.unnebäck.se/"><img src="https://avatars0.githubusercontent.com/u/189580?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Linus Unnebäck</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=LinusU" title="Code">💻</a> <a href="#infra-LinusU" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/react-native-community/hooks/commits?author=LinusU" title="Documentation">📖</a> <a href="https://github.com/react-native-community/hooks/commits?author=LinusU" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://stackoverflow.com/users/692499/tony"><img src="https://avatars1.githubusercontent.com/u/696842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tony Xiao</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=tonyxiao" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ronal2do"><img src="https://avatars3.githubusercontent.com/u/4389565?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ronaldo Lima</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=ronal2do" title="Code">💻</a></td>
    <td align="center"><a href="https://mariusreimer.com"><img src="https://avatars3.githubusercontent.com/u/15148377?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marius Reimer</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=reime005" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/pnishith"><img src="https://avatars1.githubusercontent.com/u/24517032?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nishith Patel</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=pnishith" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jozn"><img src="https://avatars2.githubusercontent.com/u/3476299?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jozn</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=jozn" title="Documentation">📖</a></td>
    <td align="center"><a href="http://hipstersmoothie.com"><img src="https://avatars3.githubusercontent.com/u/1192452?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Lisowski</b></sub></a><br /><a href="#infra-hipstersmoothie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#platform-hipstersmoothie" title="Packaging/porting to new platform">📦</a> <a href="#tool-hipstersmoothie" title="Tools">🔧</a> <a href="https://github.com/react-native-community/hooks/commits?author=hipstersmoothie" title="Code">💻</a> <a href="https://github.com/react-native-community/hooks/commits?author=hipstersmoothie" title="Documentation">📖</a></td>
    <td align="center"><a href="https://linkedin.com/in/farazamiruddin"><img src="https://avatars2.githubusercontent.com/u/6789822?v=4?s=100" width="100px;" alt=""/><br /><sub><b>faraz ahmad</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=faahmad" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.naderdabit.me"><img src="https://avatars1.githubusercontent.com/u/1857282?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nader Dabit</b></sub></a><br /><a href="#ideas-dabit3" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://twitter.com/dani_akash_"><img src="https://avatars3.githubusercontent.com/u/6841445?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dani Akash</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=DaniAkash" title="Code">💻</a></td>
    <td align="center"><a href="https://dylanvann.com/"><img src="https://avatars0.githubusercontent.com/u/1537615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dylan Vann</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=DylanVann" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/thinklinux"><img src="https://avatars1.githubusercontent.com/u/326949?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tihomir Valkanov</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=thinklinux" title="Documentation">📖</a></td>
    <td align="center"><a href="http://twitter.com/pistoudev"><img src="https://avatars1.githubusercontent.com/u/6703711?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pierre Skowron</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=pistou" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Gamal-Shaban"><img src="https://avatars1.githubusercontent.com/u/17288652?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gamal Shaban</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=Gamal-Shaban" title="Code">💻</a> <a href="https://github.com/react-native-community/hooks/commits?author=Gamal-Shaban" title="Documentation">📖</a> <a href="https://github.com/react-native-community/hooks/commits?author=Gamal-Shaban" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://tgrm.github.io/GregBush"><img src="https://avatars3.githubusercontent.com/u/44202486?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Greg-Bush</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=Greg-Bush" title="Documentation">📖</a> <a href="https://github.com/react-native-community/hooks/commits?author=Greg-Bush" title="Code">💻</a> <a href="https://github.com/react-native-community/hooks/commits?author=Greg-Bush" title="Tests">⚠️</a> <a href="#infra-Greg-Bush" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/adkenyon"><img src="https://avatars0.githubusercontent.com/u/4999026?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alan Kenyon</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=adkenyon" title="Documentation">📖</a> <a href="https://github.com/react-native-community/hooks/commits?author=adkenyon" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/thibmaek"><img src="https://avatars.githubusercontent.com/u/6213695?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thibault Maekelbergh</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=thibmaek" title="Tests">⚠️</a> <a href="https://github.com/react-native-community/hooks/commits?author=thibmaek" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/GertjanReynaert"><img src="https://avatars.githubusercontent.com/u/4712292?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gertjan Reynaert</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=GertjanReynaert" title="Tests">⚠️</a> <a href="https://github.com/react-native-community/hooks/commits?author=GertjanReynaert" title="Code">💻</a></td>
    <td align="center"><a href="https://profile.codersrank.io/user/retyui"><img src="https://avatars.githubusercontent.com/u/4661784?v=4?s=100" width="100px;" alt=""/><br /><sub><b>David NRB</b></sub></a><br /><a href="https://github.com/react-native-community/hooks/commits?author=retyui" title="Tests">⚠️</a> <a href="https://github.com/react-native-community/hooks/commits?author=retyui" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
