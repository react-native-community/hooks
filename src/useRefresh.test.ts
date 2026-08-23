import { act, renderHook } from "@testing-library/react-hooks"
import { useRefresh } from "./useRefresh"

const DELAY_IN_MS = 300
jest.useFakeTimers()
describe("useRefresh", () => {
	it("should invoke refresh and return correct refreshing state", async () => {
		const wait = () => {
			return new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS))
		}

		const { result } = renderHook(() => useRefresh(wait))

		const spy = jest.spyOn(result.current, "onRefresh")
		let refreshPromise: Promise<void> | undefined
		act(() => {
			refreshPromise = result.current.onRefresh()
		})

		expect(result.current.isRefreshing).toBe(true)
		expect(spy).toHaveBeenCalledTimes(1)
		await act(async () => {
			jest.advanceTimersByTime(DELAY_IN_MS)
			await refreshPromise
		})

		expect(result.current.isRefreshing).toBe(false)
	})
})
