import { useAccessibilityInfo } from "./useAccessibilityInfo"
import { act, renderHook, waitFor } from "@testing-library/react-native"
import { AccessibilityChangeEventName, AccessibilityInfo } from "react-native"

describe("useAccessibilityInfo", () => {
	const mockAddEventListener = AccessibilityInfo.addEventListener as jest.Mock

	const mockIsBoldTextEnabled = AccessibilityInfo.isBoldTextEnabled as jest.Mock
	const mockIsGrayscaleEnabled = AccessibilityInfo.isGrayscaleEnabled as jest.Mock
	const mockIsInvertColorsEnabled = AccessibilityInfo.isInvertColorsEnabled as jest.Mock
	const mockIsReduceMotionEnabled = AccessibilityInfo.isReduceMotionEnabled as jest.Mock
	const mockIsReduceTransparencyEnabled = AccessibilityInfo.isReduceTransparencyEnabled as jest.Mock
	const mockIsScreenReaderEnabled = AccessibilityInfo.isScreenReaderEnabled as jest.Mock

	const createEmitChangeEvent = (event: AccessibilityChangeEventName) => {
		let handler: (value: boolean) => void

		mockAddEventListener.mockImplementation((eventName, fn) => {
			if (eventName === event) {
				handler = fn
			}

			return { remove: jest.fn() }
		})

		return (value: boolean) => handler(value)
	}

	beforeAll(() => {
		mockIsBoldTextEnabled.mockResolvedValue(false)
		mockIsGrayscaleEnabled.mockResolvedValue(false)
		mockIsInvertColorsEnabled.mockResolvedValue(false)
		mockIsReduceMotionEnabled.mockResolvedValue(false)
		mockIsReduceTransparencyEnabled.mockResolvedValue(false)
		mockIsScreenReaderEnabled.mockResolvedValue(false)
	})

	describe("screenReaderEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().screenReaderEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsScreenReaderEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().screenReaderEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("screenReaderChanged")
			const { result } = renderHook(() => useAccessibilityInfo().screenReaderEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})

	describe("grayscaleEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().grayscaleEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsGrayscaleEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().grayscaleEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("grayscaleChanged")
			const { result } = renderHook(() => useAccessibilityInfo().grayscaleEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})

	describe("invertColorsEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().invertColorsEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsInvertColorsEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().invertColorsEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("invertColorsChanged")
			const { result } = renderHook(() => useAccessibilityInfo().invertColorsEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})

	describe("reduceMotionEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().reduceMotionEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsReduceMotionEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().reduceMotionEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("reduceMotionChanged")
			const { result } = renderHook(() => useAccessibilityInfo().reduceMotionEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})

	describe("reduceTransparencyEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().reduceTransparencyEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsReduceTransparencyEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().reduceTransparencyEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("reduceTransparencyChanged")
			const { result } = renderHook(() => useAccessibilityInfo().reduceTransparencyEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})

	describe("boldTextEnabled", () => {
		it("should return undefined until promise will be resolved", async () => {
			const { result } = renderHook(() => useAccessibilityInfo().boldTextEnabled)

			expect(result.current).toBeUndefined()
		})

		it("should return default value", async () => {
			const defaultValue = true

			mockIsBoldTextEnabled.mockResolvedValueOnce(defaultValue)

			const { result } = renderHook(() => useAccessibilityInfo().boldTextEnabled)

			await waitFor(() => expect(result.current).toBe(defaultValue))
		})

		it("should update value when it change", async () => {
			const newValue = true
			const emit = createEmitChangeEvent("boldTextChanged")
			const { result } = renderHook(() => useAccessibilityInfo().boldTextEnabled)
			await waitFor(() => expect(result.current).toBe(false))

			const { current: initial } = result

			act(() => emit(newValue))

			const { current: afterUpdate } = result

			expect({ initial, afterUpdate }).toEqual({
				initial: false,
				afterUpdate: newValue,
			})
		})
	})
})
