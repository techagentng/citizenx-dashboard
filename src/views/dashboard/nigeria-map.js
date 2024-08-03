import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import geoData from './nigeria_lga_boundaries.geojson';
import './tooltip.css';
import { getMapMarkers } from 'services/mapService';
import Fuse from 'fuse.js';

// Utility function to normalize state names
const normalizeStateName = (name) => name.trim().toLowerCase();

// Create a mapping for common state name variations
const stateNameMapping = {
    'bornu': 'borno',
    'federal capital territory': 'fct',
    // Add other common variations here
};

const mapStateName = (name) => {
    const normalized = normalizeStateName(name);
    return stateNameMapping[normalized] || normalized;
};

const NigerianMap = () => {
    const [setReportCounts] = useState([]);
    const [fuse, setFuse] = useState(null);

    // Fetch data on component mount
    useEffect(() => {
        getMapMarkers()
            .then((data) => {
                // Normalize data and initialize Fuse.js
                const normalizedData = data.map(item => ({
                    ...item,
                    state_name: mapStateName(item.state_name),
                }));
                console.log('Normalized API Data:', normalizedData);

                // Set up Fuse.js for fuzzy matching
                const fuseInstance = new Fuse(normalizedData, {
                    keys: ['state_name'],
                    threshold: 0.3, // Adjust threshold for match sensitivity
                });
                setFuse(fuseInstance);
                setReportCounts(normalizedData);
            })
            .catch((error) => console.error('API error:', error));
    }, []);

    // Get the count for a given state using fuzzy matching
    const getCountForState = (stateName) => {
        if (!fuse) return 0;

        const mappedStateName = mapStateName(stateName);
        const results = fuse.search(mappedStateName);
        const found = results.length > 0 ? results[0].item : null;

        console.log('Looking for:', mappedStateName, 'Found:', found);
        return found ? found.report_count : 0;
    };

    return (
        <>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 3000,
                    center: [8, 9]
                }}
                width={800}
                height={600}
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const stateName = geo.properties.admin1Name.trim();
                            const count = getCountForState(stateName);

                            // Debugging output for each state
                            console.log('State Name from GeoJSON:', stateName);
                            console.log('Report Count for State:', count);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: { fill: '#ffff', stroke: '#0e4934', strokeWidth: 1.5 },
                                        hover: { fill: '#0e4934', stroke: '#000', strokeWidth: 0.75 },
                                        pressed: { fill: '#E42', stroke: '#000', strokeWidth: 0.75 }
                                    }}
                                    data-tooltip-id="state-tooltip"
                                    data-tooltip-content={`
                                        State: ${stateName}, 
                                        Count: ${count}
                                    `}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <Tooltip id="state-tooltip" className="custom-tooltip" />
        </>
    );
};

export default NigerianMap;
