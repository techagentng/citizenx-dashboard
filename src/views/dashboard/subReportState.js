import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getStateReportCountsState } from 'services/reportService'; 
import BarChart from './barchartState'; 
import PieChart from './piechartState'; 
import { Grid, Typography, Box } from '@mui/material';

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
                setTotalUsers(data.total_users ?? 'N/A');
                setTotalReports(data.total_reports ?? 'N/A');
            })
            .catch((err) => {
                console.error('Error fetching report data:', err);
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, [selectedState]);

    if (loading) {
        return <Typography>Loading report data for {selectedState}...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Report Data for {selectedState}
            </Typography>
            <Typography variant="body1">
                <strong>Total Users:</strong> {totalUsers}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Total Reports:</strong> {totalReports}
            </Typography>

            {reportData.length > 0 ? (
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: { xs: '100%', md: 500 }, // Full width on mobile, capped on desktop
                                height: 400, // Fixed height, adjust as needed
                                overflow: 'hidden', // Prevent overflow
                            }}
                        >
                            <BarChart data={reportData} title={`Report Types in ${selectedState}`} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: { xs: '100%', md: 500 }, // Full width on mobile, capped on desktop
                                height: 400, // Fixed height, adjust as needed
                                overflow: 'hidden',
                            }}
                        >
                            <PieChart data={reportData} title={`Report Distribution in ${selectedState}`} />
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <Typography>No report data available for this state.</Typography>
            )}
        </Box>
    );
};

export default SubReport;