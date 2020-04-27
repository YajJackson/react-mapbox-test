import React, { useEffect, useRef, useState } from 'react'
import mapboxgl, { Map } from 'mapbox-gl'

import CSS from 'csstype'
import { usePosition } from '@hooks/usePosition'

const MAPBOX_TOKEN = 'YOUR TOKEN HERE'

enum MAP_STYLE {
    STREET = 'mapbox://styles/mapbox/streets-v11',
    DARK = 'mapbox://styles/mapbox/dark-v10',
    LIGHT = 'mapbox://styles/mapbox/light-v10',
    OUTDOOR = 'mapbox://styles/mapbox/outdoors-v11',
}

interface props {
    containerStyle?: CSS.Properties
}
const styles = {
    width: '500px',
    height: '500px',
}
export const MapBoxComponent: React.FunctionComponent<props> = ({ containerStyle }) => {
    const { lat, lng } = usePosition()
    const [map, setMap] = useState<Map | null>(null)
    const mapContainer = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: MAP_STYLE.LIGHT,
                center: [0, 0],
                zoom: 5,
            })

            map.on('load', () => {
                setMap(map)
                map.resize()
            })
        }

        if (!map) initializeMap({ setMap, mapContainer })
        else map.flyTo({ center: { lat, lng }, zoom: 11 })
    }, [map, lat, lng])

    return <div ref={(el) => (mapContainer.current = el)} style={styles} />
}
