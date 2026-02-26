import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { setState, setLga } from 'store/slices/graphs';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography,
    CircularProgress,
    Box
} from '@mui/material';
import { getGovernorDetails } from 'services/reportService';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts, currentState }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lgaState: { lga } } = useSelector((state) => state.graphs);
    const [showModal, setShowModal] = useState(false);
    const [checkingData, setCheckingData] = useState(false);
    const [dataAvailable, setDataAvailable] = useState(true);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const checkDataAvailability = async (reportType, reportCount) => {
        setCheckingData(true);
        try {
            await getGovernorDetails(currentState);
            setDataAvailable(true);
            setCheckingData(false);
            
            // Navigate if data is available
            dispatch(setState(currentState));  
            dispatch(setLga(lga));     
            navigate('/dashboard/sub_reports', { 
                state: { 
                    reportType,       
                    state: currentState, 
                    lga: lga,  
                    count: reportCount 
                } 
            });
        } catch (error) {
            console.error('Error checking data availability:', error);
            setDataAvailable(false);
            setCheckingData(false);
        }
    };

    const handleClick = (event, elements, chart) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const reportType = chart.data.labels[clickedIndex];
            const reportCount = chart.data.datasets[0].data[clickedIndex];
            
            setPendingNavigation({ reportType, reportCount });
            setShowModal(true);
        }
    };

    const handleConfirmNavigation = () => {
        if (pendingNavigation) {
            setShowModal(false);
            checkDataAvailability(pendingNavigation.reportType, pendingNavigation.reportCount);
        }
    };

    const handleCancelNavigation = () => {
        setShowModal(false);
        setPendingNavigation(null);
    };

    const data = {
        labels: reportTypes,
        datasets: [{
            data: reportCounts,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(199, 199, 199)',
                'rgb(83, 102, 44)',
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        onClick: (event, elements, chart) => handleClick(event, elements, chart),
    };

    return (
        <>
            <div style={{ width: '60%' }}>
                <Pie data={data} options={options} />
            </div>
            
            {/* Confirmation Modal */}
            <Dialog open={showModal} onClose={handleCancelNavigation} maxWidth="sm" fullWidth>
                <DialogTitle>View Report Details</DialogTitle>
                <DialogContent>
                    {checkingData ? (
                        <Box display="flex" justifyContent="center" alignItems="center" py={3}>
                            <CircularProgress />
                            <Typography variant="body1" sx={{ ml: 2 }}>
                                Checking data availability...
                            </Typography>
                        </Box>
                    ) : !dataAvailable ? (
                        <Typography variant="body1" color="error">
                            The data for this report has been removed or is no longer available. 
                            Please try again later or contact support if the issue persists.
                        </Typography>
                    ) : (
                        <Typography variant="body1">
                            Do you want to view detailed reports for {pendingNavigation?.reportType} in {currentState}?
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    {checkingData ? (
                        <Button onClick={handleCancelNavigation}>Cancel</Button>
                    ) : !dataAvailable ? (
                        <Button onClick={handleCancelNavigation} variant="contained">
                            Close
                        </Button>
                    ) : (
                        <>
                            <Button onClick={handleCancelNavigation}>Cancel</Button>
                            <Button onClick={handleConfirmNavigation} variant="contained" color="primary">
                                View Details
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PieChart;