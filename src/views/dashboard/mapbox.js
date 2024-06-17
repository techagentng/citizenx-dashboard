import React, { useState } from 'react';
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
  { lat: 7.8754, lng: 5.237, popup: 'Ekiti' }  // Ekiti State
];

const MapboxMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 9.082, // Central location in Nigeria
    longitude: 8.6753, // Central location in Nigeria
    zoom: 6,
    width: '100%',
    height: '400px',
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapboxApiAccessToken={mapboxgl.accessToken}
      >
        {markers.map((marker, index) => (
          <Marker key={index} latitude={marker.lat} longitude={marker.lng}>
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
            >
              <svg
                height="20"
                viewBox="0 0 24 24"
                style={{
                  fill: "#d00",
                  stroke: "none",
                  transform: "translate(-12px, -24px)"
                }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.69 3.41 1.79 4.79L12 22l5.21-8.21C18.31 12.41 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
              </svg>
            </div>
          </Marker>
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
