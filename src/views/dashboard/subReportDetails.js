import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSubReportsByCategory } from 'services/reportService'; 
import { useSelector } from 'react-redux';

const SubReportDetailsPage = () => {
    const location = useLocation();
    const { state, count } = location.state || {};
    const [subReports, setSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state: selectedState, lga } = useSelector((state) => state.graphs.lgaState);

    useEffect(() => {
        if (state) {
            getSubReportsByCategory(state)
                .then((data) => {
                    setSubReports(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [state]);

    return (
        <div>
            <h1>SubReport details page for {selectedState} </h1>
            <p>Report Type: {state}</p>
            <p>LGA: {lga}</p>
            <p>State: {selectedState}</p>
            <p>Count: {count}</p>

            {loading && <p>Loading sub-reports...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <ul>
                    {subReports.map((subReport) => (
                        <li key={subReport.id}>{subReport.sub_report_type}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubReportDetailsPage;
