import { useState, useCallback } from "react"
import { LayoutChangeEvent, LayoutRectangle } from "react-native"

export function useLayout() {
	const [layout, setLayout] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	})

	const onLayout = useCallback((e: LayoutChangeEvent) => setLayout(e.nativeEvent.layout), [])

	return {
		onLayout,
		...layout,
	}
}
