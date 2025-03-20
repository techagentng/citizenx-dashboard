import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStateReportCountsState } from 'services/reportService'; 
import BarChart from './barchartState'; 
import PieChart from './piechartState'; 

const SubReport = () => {
    const location = useLocation();
    const selectedState = location.state?.selectedState || 'N/A';

    const [reportData, setReportData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalReports, setTotalReports] = useState(null);
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
                setTotalUsers(data.total_users ?? 'N/A'); // Ensure fallback value
                setTotalReports(data.total_reports ?? 'N/A');
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
            <p><strong>Total Users:</strong> {totalUsers}</p>
            <p><strong>Total Reports:</strong> {totalReports}</p>
    
            {reportData.length > 0 ? (
                <div className="charts-container">
                    <div className="chart-item">
                        <BarChart data={reportData} title={`Report Types in ${selectedState}`} />
                    </div>
                    <div className="chart-item">
                        <PieChart data={reportData} title={`Report Distribution in ${selectedState}`} />
                    </div>
                </div>
            ) : (
                <p>No report data available for this state.</p>
            )}
        </div>
    );    
};

export default SubReport;
