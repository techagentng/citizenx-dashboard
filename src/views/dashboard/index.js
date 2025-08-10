import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Components
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import PopularCard from './PopularCard';
import PopularCardAll from './PopularCardAll';
import BarChart from './barchart';
import PieChart from './piechart';
import NigerianMap from './nigeria-map';

// Utils & Styles
import { gridSpacing } from 'store/constant';

// Redux
import { fetchDashboardData } from 'store/slices/graphs';
import { 
  selectDashboardData, 
  selectLoading, 
  selectError,
  selectSelectedState, 
  selectSelectedLga
} from 'store/slices/graphs';

const DashboardPage = () => {
    const dispatch = useDispatch();
    
    // Redux state
    const dashboardData = useSelector(selectDashboardData);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const selectedState = useSelector(selectSelectedState);
    const selectedLga = useSelector(selectSelectedLga);
    
    // Local state for date range filter
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // Fetch data when component mounts or filters change
    useEffect(() => {
        if (selectedState && selectedLga) {
            dispatch(fetchDashboardData({
                state: selectedState,
                lga: selectedLga,
                startDate: startDate,
                endDate: endDate
            }));
        }
    }, [dispatch, selectedState, selectedLga, startDate, endDate]);

    // Format date to YYYY-MM-DD format (UTC)
    const formatDate = useCallback((date) => {
        if (!date) return null;
        // If it's a string, assume it's already in the correct format
        if (typeof date === 'string') return date;
        // If it's a Date object, format it to YYYY-MM-DD
        return date.toISOString().split('T')[0];
    }, []);

    // Handle date range change
    const handleDateChange = useCallback((newValue) => {
        // Only update if both dates are provided or both are null
        if ((newValue[0] && newValue[1]) || (!newValue[0] && !newValue[1])) {
            setDateRange(newValue);
        } else if (newValue[0] && !newValue[1]) {
            // If only one date is selected, don't update yet
            return;
        }
    }, []);

    // Destructure dashboard data with default values
    const {
        report_types: reportTypes = [],
        report_counts: reportCounts = [],
        total_reports: totalOverallReports = 0,
        total_users: totalUsers = 0
    } = dashboardData || {};

    // All data is now managed by Redux
    
    // Show loading state
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
                <Box ml={2}>Loading dashboard data...</Box>
            </Box>
        );
    }
    
    // Show error state
    if (error) {
        return (
            <MainCard>
                <Typography color="error" variant="h5">
                    Error loading dashboard: {error}
                </Typography>
            </MainCard>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MainCard
                title={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">State and LGA Dashboard</Typography>
                        <DateRangePicker
                            startText="Start Date (YYYY-MM-DD)"
                            endText="End Date (YYYY-MM-DD)"
                            value={dateRange}
                            onChange={handleDateChange}
                            inputFormat="yyyy-MM-dd"
                            mask="____-__-__"
                            renderInput={(startProps, endProps) => (
                                <Box display="flex" alignItems="center">
                                    <input 
                                        {...startProps.inputProps} 
                                        placeholder="Start Date" 
                                        onBlur={() => {
                                            // Ensure end date is set when start date is set
                                            if (dateRange[0] && !dateRange[1]) {
                                                setDateRange([dateRange[0], dateRange[0]]);
                                            }
                                        }}
                                    />
                                    <Box sx={{ mx: 1 }}> to </Box>
                                    <input 
                                        {...endProps.inputProps} 
                                        placeholder="End Date"
                                    />
                                </Box>
                            )}
                        />
                    </Box>
                }
            >
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalUsers} 
                            details="Registered users" 
                            icon={EarningIcon} 
                            isLoading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={reportCounts?.reduce((a, b) => a + b, 0) || 0} 
                            details="Total Reports in LGA" 
                            icon={EarningIcon} 
                            isLoading={loading}
                        />
                    </Grid>                   
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalOverallReports} 
                            details="Total state reports" 
                            icon={EarningIcon} 
                            isLoading={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalOverallReports} 
                            details="Overall report in Nigeria" 
                            icon={EarningIcon} 
                            isLoading={loading}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="left" sx={{ mt: 4, mb: 4 }}>
                            LGA Incident Report Charts
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    {/* First Column */}
                    <Grid item xs={12} md={6}>
                        <MainCard content={false}>
                            {!reportTypes || reportTypes.length === 0 ? (
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <p>No data available for the selected state and LGA.</p>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container>
                                    {/* <Grid item xs={12}>
                                            <BarChart reportTypes={reportTypes} reportCounts={reportCounts} />
                                        </Grid> */}
                                    <Grid item xs={12}>
                                        <PieChart reportTypes={reportTypes} reportCounts={reportCounts} currentState={selectedState}  />
                                    </Grid>
                                </Grid>
                            )}
                        </MainCard>
                    </Grid>

                    {/* Second Column */}
                    <Grid item xs={12} md={6}>
                        <MainCard content={false}>
                            {!reportTypes || reportTypes.length === 0 ? (
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <p>No data available for the selected state and LGA.</p>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container>
                                    <Grid item xs={12}>
                                        <BarChart reportTypes={reportTypes} reportCounts={reportCounts} />
                                    </Grid>
                                </Grid>
                            )}
                        </MainCard>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <MainCard
                            title={
                                <Typography variant="h3" align="left">
                                    Map of Nigeria & State Report Counts
                                </Typography>
                            }
                        >
                            <NigerianMap selectedState={selectedState} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard
                            title={`Top Reported cases in ${selectedLga || 'LGA'}`}
                            data={reportTypes?.map((type, index) => ({
                                reportType: type,
                                reportCount: reportCounts?.[index] || 0
                            }))}
                            type="reportTypes"
                            totalReportCount={reportCounts?.reduce((a, b) => a + b, 0) || 0}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* Top LGAs View */}
                        <PopularCard
                            title={`Top Reported Cases In ${selectedState || 'State'}`}
                            data={reportTypes?.map((type, index) => ({
                                reportType: type,
                                reportCount: reportCounts?.[index] || 0
                            }))}
                            totalReportCount={reportCounts?.reduce((a, b) => a + b, 0) || 0}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <PopularCardAll />
                    </Grid>
                    {/* <Grid item xs={12} md={4} sx={{ backgroundColor: 'white' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                            <Typography variant="h5">Overall Ratings</Typography>
                            <TextField
                                id="standard-select-currency-1"
                                label="Select Report Type"
                                select
                                value={selectedReportType || ''}
                                onChange={handleReportTypeChange}
                                sx={{ minWidth: 200 }}
                            >
                                {reportTypeOptions.map((type) => (
                                    <MenuItem key={type} value={type} disabled={type === 'Select Report Type'}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <PieChart2 reportPercent={{ good_percentage, bad_percentage }} />
                    </Grid> */}
                </Grid>
            </MainCard>
        </LocalizationProvider>
    );
};

export default DashboardPage;
