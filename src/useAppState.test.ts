import { act, renderHook } from "@testing-library/react-hooks"
import { AppState, AppStateStatus } from "react-native"
import { useAppState } from "./useAppState"

jest.mock("react-native", () => ({
	AppState: {
		currentState: "mock-currentState",
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
	},
}))

describe("useAppState", () => {
	const addEventListenerMock = AppState.addEventListener as jest.Mock
	const createEmitAppStateChange = () => {
		let listener: (newStatus: AppStateStatus) => void

		addEventListenerMock.mockImplementationOnce((_, fn) => {
			listener = fn
		})

		return (newStatus: AppStateStatus) => listener(newStatus)
	}

	it("should return current state by default", () => {
		const { result } = renderHook(() => useAppState())

		expect(result.current).toBe(AppState.currentState)
	})

	it("should update state when it change", () => {
		const newStatus = "background"
		const emit = createEmitAppStateChange()

		const { result } = renderHook(() => useAppState())

		const { current: initialStatus } = result

		act(() => {
			emit(newStatus)
		})

		const { current: statusAfterUpdate } = result

		expect({ initialStatus, statusAfterUpdate }).toEqual({
			initialStatus: AppState.currentState,
			statusAfterUpdate: newStatus,
		})
	})
})
