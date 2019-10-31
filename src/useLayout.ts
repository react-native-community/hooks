import React from 'react'


export default function useLayout() {
    const [layout, setLayout] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })
    const onLayout = React.useCallback(e => setLayout(e.nativeEvent.layout), [])

    return {
        onLayout,
        ...layout,
    }
}
