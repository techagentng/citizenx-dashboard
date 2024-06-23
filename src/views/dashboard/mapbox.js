import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { WebMercatorViewport } from 'viewport-mercator-project';
import { getMapMarkers } from 'services/mapService';
// import { getStateCount } from 'services/mapService';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoia2Vub2kiLCJhIjoiY2x4amljMmtjMXZzcjJqc2hxMnBkdGJjYyJ9.1EPJXdBM5-wrywGBVrxWPA';

const MapboxMap = () => {
    const [markers, setMarkers] = useState([]);
    const mapContainer = useRef(null);
    const [viewport, setViewport] = useState({
        latitude: 9.082,
        longitude: 8.6753,
        zoom: 6,
        width: '100%',
        height: '400px'
    });

    useEffect(() => {
        getMapMarkers()
            .then(data => setMarkers(data))
            .catch(error => console.error('Error fetching markers:', error));
    }, []);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    useEffect(() => {
        if (markers.length > 0) {
            const bounds = markers.reduce(
                (acc, marker) => {
                    acc[0][0] = Math.min(acc[0][0], marker.lng);
                    acc[0][1] = Math.min(acc[0][1], marker.lat);
                    acc[1][0] = Math.max(acc[1][0], marker.lng);
                    acc[1][1] = Math.max(acc[1][1], marker.lat);
                    return acc;
                },
                [
                    [markers[0].lng, markers[0].lat],
                    [markers[0].lng, markers[0].lat]
                ]
            );

            const viewportInstance = new WebMercatorViewport({
                width: window.innerWidth,
                height: window.innerHeight
            }).fitBounds(bounds, { padding: 40 });

            setViewport((prevViewport) => ({
                ...prevViewport,
                longitude: viewportInstance.longitude,
                latitude: viewportInstance.latitude,
                zoom: viewportInstance.zoom
            }));
        }
    }, []);

    return (
        <div style={{ height: '400px', width: '100%' }} ref={mapContainer}>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(newViewport) => setViewport(newViewport)}
                mapboxApiAccessToken={mapboxgl.accessToken}
            >
                {markers.map((marker, index) => (
                    <div key={index} onMouseEnter={() => setHoveredMarker(marker)} onMouseLeave={() => setHoveredMarker(null)}>
                        <Marker latitude={marker.lat} longitude={marker.lng}>
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedMarker(marker);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        setSelectedMarker(marker);
                                    }
                                }}
                                style={{
                                    cursor: 'pointer',
                                    color: 'red',
                                    fontSize: '24px'
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="44"
                                    height="44"
                                    viewBox="0 0 24 24"
                                    stroke="rgb(16,72,51)"
                                    fill="none"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                                        fill="#104833"
                                    />
                                </svg>
                            </div>
                        </Marker>
                        {hoveredMarker === marker && (
                            <Popup
                                latitude={marker.lat}
                                longitude={marker.lng}
                                closeButton={false}
                                closeOnClick={false}
                                onClose={() => setHoveredMarker(null)}
                                anchor="top"
                            >
                                <div>{marker.popup}</div>
                            </Popup>
                        )}
                    </div>
                ))}

                {selectedMarker && (
                    <Popup
                        latitude={selectedMarker.lat}
                        longitude={selectedMarker.lng}
                        onClose={() => setSelectedMarker(null)}
                        closeOnClick={true}
                        anchor="top"
                    >
                        <div>{selectedMarker.popup}</div>
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
};

export default MapboxMap;
