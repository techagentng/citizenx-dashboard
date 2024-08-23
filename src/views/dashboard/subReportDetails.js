import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSubReportsByCategory } from 'services/reportService'; // Adjust the path to your service file

const SubReportDetailsPage = () => {
    const location = useLocation();
    const { state, lga, count } = location.state || {};
    const [subReports, setSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h1>Sub Reports Details Page</h1>
            <p>Report Type: {state}</p>
            <p>LGA: {lga}</p>
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
