import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStateReportCountsState } from 'services/reportService'; 
import BarChart from './barchartState'; 
import PieChart from './piechartState'; 

const SubReport = () => {
    const location = useLocation();
    const selectedState = location.state?.selectedState || 'N/A';

    const [reportData, setReportData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalReports, setTotalReports] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedState === 'N/A') {
            setError('No state selected');
            return;
        }

        setLoading(true);
        setError(null);

        getStateReportCountsState(selectedState)
            .then((data) => {
                setReportData(data.report_counts || []);
                setTotalUsers(data.total_users || 0);
                setTotalReports(data.total_reports || 0);
            })
            .catch((err) => {
                console.error('Error fetching report data:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [selectedState]);

    if (loading) {
        return <div>Loading report data for {selectedState}...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Report Data for {selectedState}</h2>
            <p>Total Users: {totalUsers}</p>
            <p>Total Reports: {totalReports}</p>

            <BarChart data={reportData} title={`Report Types in ${selectedState}`} />
            <PieChart data={reportData} title={`Report Distribution in ${selectedState}`} />
        </div>
    );
};

export default SubReport;