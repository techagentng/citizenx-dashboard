import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import geoData from './nigeria_lga_boundaries.geojson';
import './tooltip.css';
import { getMapMarkers } from 'services/mapService';

const NigerianMap = () => {
    const [reportCountsMap, setReportCountsMap] = useState({});
    const navigate = useNavigate(); // Hook for navigation

    // Fetch data on component mount
    useEffect(() => {
        getMapMarkers()
            .then((data) => {
                // console.log('Fetched MAP Data:', data);

                // Create a mapping of state names to their report counts
                const reportCounts = data.reduce((acc, item) => {
                    const stateName = item.state_name.trim();
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

    // Determine the fill color based on the report count
    const getFillColor = (count) => {
        return count > 0 ? '#0e4934' : '#ffff';
    };

    // Handle click on a state tile
    const handleStateClick = (stateName) => {
        navigate('/dashboard/sub_report_state', { state: { selectedState: stateName } });
    };    

    return (
        <>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 2500,
                    center: [8, 9]
                }}
                width={700}
                height={500}
            >
                <Geographies geography={geoData}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            const stateName = geo.properties.admin1Name.trim();
                            const count = getCountForState(stateName);

                            console.log('State Name from GeoJSON:', stateName);
                            console.log('Report Count for State:', count);

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => handleStateClick(stateName)} // Add click handler
                                    style={{
                                        default: { fill: getFillColor(count), stroke: '#0e4934', strokeWidth: 1.5, cursor: 'pointer' }, // Add cursor pointer
                                        hover: { fill: '#0e4934', stroke: '#000', strokeWidth: 0.75, cursor: 'pointer' },
                                        pressed: { fill: '#E42', stroke: '#000', strokeWidth: 0.75, cursor: 'pointer' }
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