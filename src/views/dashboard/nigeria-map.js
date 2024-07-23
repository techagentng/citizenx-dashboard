import React, {gitState, useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import geoData from './nigeria_lga_boundaries.geojson';
import './tooltip.css';
import { getMapMarkers } from 'services/mapService';

const markers = [{ markerOffset: -20, name: 'Lagos', coordinates: [3.3792, 6.5244] }];

const NigerianMap = () => {
    const [reportCounts, setReportCounts] = useState([]);

    useEffect(() => {
        getMapMarkers()
            .then((data) => setReportCounts(data))
            .catch((error) => console.error(error));
    }, []);

    const getCountForLGA = (stateName, lgaName) => {
        const found = reportCounts.find((count) => count.StateName === stateName && count.LGAName === lgaName);
        return found ? found.Count : 0;
    };

    return (
        <>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 2500,
                    center: [8, 9]
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
                                    default: { fill: '#ffff', stroke: '#0e4934', strokeWidth: 1.5 },
                                    hover: { fill: '#0e4934', stroke: '#000', strokeWidth: 0.75 },
                                    pressed: { fill: '#E42', stroke: '#000', strokeWidth: 0.75 }
                                }}
                                data-tooltip-id="lga-tooltip"
                                data-tooltip-content={`${geo.properties.admin2Name}, ${geo.properties.admin1Name}, Count: ${getCountForLGA(geo.properties.admin1Name, geo.properties.admin2Name)}`}
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
            <Tooltip id="lga-tooltip" className="custom-tooltip" />
        </>
    );
};

export default NigerianMap;
