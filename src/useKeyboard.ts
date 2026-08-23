import { useEffect, useState } from "react"
import { Keyboard, KeyboardEventListener, KeyboardMetrics } from "react-native"

const emptyCoordinates = Object.freeze({
	screenX: 0,
	screenY: 0,
	width: 0,
	height: 0,
})
const initialValue = {
	start: emptyCoordinates,
	end: emptyCoordinates,
}

export function useKeyboard() {
	// These APIs are unavailable in older supported React Native versions.
	const [initialMetrics] = useState(() => Keyboard.metrics?.())
	const [shown, setShown] = useState(() => {
		const isVisible = Keyboard.isVisible?.()
		return isVisible ?? initialMetrics !== undefined
	})
	const [coordinates, setCoordinates] = useState<{
		start: undefined | KeyboardMetrics
		end: KeyboardMetrics
	}>(initialMetrics ? { start: undefined, end: initialMetrics } : initialValue)
	const [keyboardHeight, setKeyboardHeight] = useState(initialMetrics?.height ?? 0)

	const handleKeyboardWillShow: KeyboardEventListener = (e) => {
		setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
	}
	const handleKeyboardDidShow: KeyboardEventListener = (e) => {
		setShown(true)
		setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
		setKeyboardHeight(e.endCoordinates.height)
	}
	const handleKeyboardWillHide: KeyboardEventListener = (e) => {
		setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
	}
	const handleKeyboardDidHide: KeyboardEventListener = (e) => {
		setShown(false)
		setKeyboardHeight(0)
		if (e) {
			setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
		} else {
			setCoordinates(initialValue)
		}
	}

	useEffect(() => {
		const subscriptions = [
			Keyboard.addListener("keyboardWillShow", handleKeyboardWillShow),
			Keyboard.addListener("keyboardDidShow", handleKeyboardDidShow),
			Keyboard.addListener("keyboardWillHide", handleKeyboardWillHide),
			Keyboard.addListener("keyboardDidHide", handleKeyboardDidHide),
		]

		return () => {
			subscriptions.forEach((subscription) => subscription.remove())
		}
	}, [])

	return {
		keyboardShown: shown,
		coordinates,
		keyboardHeight,
	}
}
