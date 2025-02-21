import { jest } from "@jest/globals"

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
	select: jest.fn((platform) => platform.default),
}))

jest.mock("react-native", () => {
	const RN = jest.requireActual("react-native/Libraries/ReactNative/oss/ReactNativeRenderer-prod")

	return {
		Platform: {
			select: jest.fn((platform) => platform.default),
		},
		Dimensions: {
			get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
			addEventListener: jest.fn(),
		},
		useWindowDimensions: jest.fn().mockReturnValue({ width: 375, height: 812 }),
		AppState: {
			currentState: "active",
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
		},
		BackHandler: {
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
		},
		Keyboard: {
			addListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
			emit: jest.fn(),
		},
		AccessibilityInfo: {
			addEventListener: jest.fn(() => ({
				remove: jest.fn(),
			})),
			removeEventListener: jest.fn(),
			setAccessibilityFocus: jest.fn(),
			announceForAccessibility: jest.fn(),
			isBoldTextEnabled: jest.fn().mockResolvedValue(false),
			isScreenReaderEnabled: jest.fn().mockResolvedValue(false),
			isGrayscaleEnabled: jest.fn().mockResolvedValue(false),
			isInvertColorsEnabled: jest.fn().mockResolvedValue(false),
			isReduceMotionEnabled: jest.fn().mockResolvedValue(false),
			isReduceTransparencyEnabled: jest.fn().mockResolvedValue(false),
		},
		InteractionManager: {
			runAfterInteractions: jest.fn(() => ({
				cancel: jest.fn(),
			})),
		},
		Image: {
			getSize: jest.fn(),
			getSizeWithHeaders: jest.fn(),
			resolveAssetSource: jest.fn().mockReturnValue({ width: 100, height: 100 }),
		},
	}
})

global.window = {}
global.window.addEventListener = () => {}
