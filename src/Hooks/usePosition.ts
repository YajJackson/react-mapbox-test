import { useEffect, useState } from 'react'

import { LatLng } from '_types/index'

export const usePosition = () => {
    const [position, setPosition] = useState<LatLng>({ lat: 0, lng: 0 })
    const [error, setError] = useState<string | null>(null)

    const onChange = ({ coords }) => {
        setPosition({
            lat: coords.latitude,
            lng: coords.longitude,
        })
    }
    const onError = (error) => {
        setError(error.message)
    }
    useEffect(() => {
        const geo = navigator.geolocation
        if (!geo) {
            setError('Geolocation is not supported')
            return
        }
        const watcher = geo.watchPosition(onChange, onError)
        return () => geo.clearWatch(watcher)
    }, [])
    return { ...position, error }
}
