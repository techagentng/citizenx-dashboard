import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vub2kiLCJhIjoiY2x4amljMmtjMXZzcjJqc2hxMnBkdGJjYyJ9.1EPJXdBM5-wrywGBVrxWPA';

// Example markers for some states in Nigeria
const markers = [
    { lat: 9.082, lng: 8.6753, popup: 'Abuja' }, // Federal Capital Territory
    { lat: 6.5244, lng: 3.3792, popup: 'Lagos' }, // Lagos State
    { lat: 11.748, lng: 11.966, popup: 'Kano' }, // Kano State
    { lat: 7.8754, lng: 5.237, popup: 'Ekiti' } // Ekiti State
];

const MapboxMap = () => {
    const mapContainer = useRef(null);
    const [viewport, setViewport] = useState({
        latitude: 9.082, // Central location in Nigeria
        longitude: 8.6753, // Central location in Nigeria
        zoom: 6,
        width: '100%',
        height: '400px'
    });

    useEffect(() => {
        if (mapContainer.current) {
            new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [viewport.longitude, viewport.latitude],
                zoom: viewport.zoom,
                maxBounds: [
                    [2.6769, 4.272], // Southwest corner (approx)
                    [14.678, 13.865] // Northeast corner (approx)
                ] // Constrain the map to Nigeria
            });
        }
    }, [mapContainer]);

    return (
        <div style={{ height: '400px', width: '100%' }} ref={mapContainer}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(newViewport) => setViewport(newViewport)}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} latitude={marker.lat} longitude={marker.lng}>
                        <Popup longitude={marker.lng} latitude={marker.lat} closeButton={true} closeOnClick={false}>
                            {marker.popup}
                        </Popup>
                    </Marker>
                ))}
            </ReactMapGL>
        </div>
    );
};

export default MapboxMap;
