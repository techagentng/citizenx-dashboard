import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import geoData from './nigeria_lga_boundaries.geojson';
import './tooltip.css';
import { getMapMarkers } from 'services/mapService';

const NigerianMap = () => {
    const [reportCountsMap, setReportCountsMap] = useState({});

    // Fetch data on component mount
    useEffect(() => {
        getMapMarkers()
            .then((data) => {
                console.log('Fetched MAP Data:', data);

                // Create a mapping of state names to their report counts
                const reportCounts = data.reduce((acc, item) => {
                    const stateName = item.state_name.trim(); // Trim any extra spaces
                    acc[stateName] = item.report_count;
                    return acc;
                }, {});

                setReportCountsMap(reportCounts);
            })
            .catch((error) => console.error('API error:', error));
    }, []);

    // Get the count for a given state directly from the map
    const getCountForState = (stateName) => {
        return reportCountsMap[stateName.trim()] || 0;
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
                                        Report Count: ${count}
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
