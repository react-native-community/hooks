import { useInteractionManager } from "./useInteractionManager"
import { act, renderHook } from "@testing-library/react-hooks"
import { InteractionManager } from "react-native"

jest.mock("react-native", () => ({
	InteractionManager: {
		runAfterInteractions: jest.fn(),
	},
}))

describe("useInteractionManager", () => {
	const runAfterInteractionsMock = InteractionManager.runAfterInteractions as jest.Mock

	it("should return false by default", () => {
		const { result } = renderHook(() => useInteractionManager())

		expect(result.current).toBe(false)
	})

	it("should return true after all interactions have completed", () => {
		let emitAfterInteractions = () => {}

		runAfterInteractionsMock.mockImplementationOnce((cb) => {
			emitAfterInteractions = cb
		})

		const { result } = renderHook(() => useInteractionManager())

		expect(result.current).toBe(false)

		act(() => {
			emitAfterInteractions()
		})

		expect(result.current).toBe(true)
	})
})
