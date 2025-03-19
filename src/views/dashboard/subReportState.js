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

    useEffect(() => {
        if (selectedState !== 'N/A') {
            getStateReportCountsState(selectedState)
                .then((data) => {
                    setReportData(data.report_counts || []);
                    setTotalUsers(data.total_users || 0);
                    setTotalReports(data.total_reports || 0);
                })
                .catch((error) => console.error('Error fetching report data:', error));
        }
    }, [selectedState]);

    return (
        <div>
            <h2>Report Data for {selectedState}</h2>
            <p>Total Users: {totalUsers}</p>
            <p>Total Reports: {totalReports}</p>

            {/* Render Bar Chart */}
            <BarChart data={reportData} title={`Report Types in ${selectedState}`} />

            {/* Render Pie Chart */}
            <PieChart data={reportData} title={`Report Distribution in ${selectedState}`} />
        </div>
    );
};

export default SubReport;
