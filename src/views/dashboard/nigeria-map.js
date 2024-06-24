import React, { useEffect } from 'react';
// import 'jsvectormap/dist/js/jsvectormap.min.js'; 
// import 'jsvectormap/dist/css/jsvectormap.min.css'; 
// import nigeriaMap from './nigeria-map'; 

const NigeriaMap = () => {
    useEffect(() => {
        const markers = [
            { name: 'Lagos', coords: [6.5244, 3.3792] },
            { name: 'Abuja', coords: [9.0579, 7.4951] }
            // Add more markers if needed
        ];

        new jsVectorMap({
            map: 'nigeriaMap', 
            selector: '#map',
            zoomButtons: true,
            zoomOnScroll: true,

            regionStyle: {
                initial: {
                    fill: '#d1d5db'
                }
            },

            labels: {
                markers: {
                    render: (marker) => marker.name
                }
            },

            markersSelectable: true,
            selectedMarkers: markers.map((marker, index) => index),
            markers: markers,
            markerStyle: {
                initial: { fill: '#5c5cff' },
                selected: { fill: '#ff5050' }
            },
            markerLabelStyle: {
                initial: {
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    fontSize: 13
                }
            }
        });
    }, []);

    return <div id="map" style={{ width: '100%', height: '600px' }} />;
};

export default NigeriaMap;
