import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import geoData from './nigeria_lga_boundaries.geojson';

const markers = [{ markerOffset: -20, name: 'Lagos', coordinates: [3.3792, 6.5244] }];

const NigerianMap = () => {
    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                scale: 3000, // Adjust the scale to fit the map size
                center: [8, 9] // Center the map on Nigeria
            }}
            width={800}
            height={600}
        >
            <Geographies geography={geoData}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            style={{
                                default: { fill: '#D6D6DA', stroke: '#000', strokeWidth: 0.5 },
                                hover: { fill: '#F53', stroke: '#000', strokeWidth: 0.75 },
                                pressed: { fill: '#E42', stroke: '#000', strokeWidth: 0.75 }
                            }}
                        />
                    ))
                }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates}>
                    <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
                    <text textAnchor="middle" y={markerOffset} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default NigerianMap;
