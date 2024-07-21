import React from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const { lga } = location.state || {};

    if (!lga) {
        return <div>No LGA data available.</div>;
    }

    return (
        <div>
            <h1>{lga.properties.admin2Name}</h1>
            <p>State: {lga.properties.admin1Name}</p>
        </div>
    );
};

export default Index;
