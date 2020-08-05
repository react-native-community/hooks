import { DependencyList, useEffect } from "react"
import { BackHandler } from "react-native"

export function useBackHandler(handler: () => boolean, deps: DependencyList = []) {
	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", handler)

		return () => sub.remove()
	}, [handler, ...deps])
}
