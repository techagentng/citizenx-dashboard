import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import PopularCard from './PopularCard';
import PopularCardAll from './PopularCardAll';
import BarChart from './barchart';
import PieChart from './piechart';
import NigerianMap from './nigeria-map';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getGraph, getPercentCount } from 'store/slices/graphs';
import { 
    useReportCount,
    useStateReportCount,
    useLGAReportCount,
    useUserData,
    useReportTypeCount
} from 'services/dashboardApi';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const selectedState = useSelector((state) => state.graphs.lgaState.state);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts } = useSelector((state) => state.graphs.graphs);
    const [selectedReportType, setSelectedReportType] = React.useState('Accidents');

    // Overall report count
    const { 
        data: overallReportData, 
        isLoading: isOverallReportLoading 
    } = useReportCount();

    // State-specific report count
    const { 
        data: stateReportData, 
        isLoading: isStateReportLoading 
    } = useStateReportCount(selectedState);

    // LGA report count
    const { 
        data: lgaReportData, 
        isLoading: isLGALoading 
    } = useLGAReportCount(selectedLga);

    // User data
    const { 
        data: userData, 
        isLoading: isUserDataLoading 
    } = useUserData(isLoggedIn);

    // Report type count for selected state and LGA
    const { data: reportTypeCountData } = useReportTypeCount(selectedState, selectedLga);
    const totalLGAReports = reportTypeCountData?.total_reports || lgaReportData?.total_reports || 0;
    
    // Process report counts
    const totalOverallReports = overallReportData?.total_reports || 0;
    const totalStateReports = stateReportData?.total_reports || 0;

    // Other effects
    useEffect(() => {
        if (selectedState && selectedLga) {
            dispatch(getGraph(selectedState, selectedLga));
        }
    }, [dispatch, selectedState, selectedLga]);

    useEffect(() => {
        if (reportTypes?.length > 0 && selectedState) {
            dispatch(getPercentCount(selectedReportType, selectedState));
        }
    }, [dispatch, selectedReportType, selectedState, reportTypes]);

    // Set loading state based on all queries
    const isLoading = isOverallReportLoading || isStateReportLoading || 
                     isLGALoading || isUserDataLoading;

    // Report types are now handled by Redux state
    useEffect(() => {
        getReportCountByLGA(selectedLga)
            .then((data) => {
                setReportCount(data.total_reports);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [selectedLga]);

    useEffect(() => {
        getTotalUserCount()
            .then((count) => {
                console.log('User count from API:', count);
                setTotalUsers(count);
            })
            .catch((err) => {
                console.error('Failed to fetch user count:', err);
            });
    }, []);
    
    if (isLoading) {
        return <div>Loading dashboard data...</div>;
    }

    return (
        <>
            <MainCard
                title={
                    <Typography variant="h4" align="left">
                        State and LGA Dashboard
                    </Typography>
                }
            >
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={userData?.userCount || 0} 
                            details="Registered users" 
                            icon={EarningIcon} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalLGAReports} 
                            details={`${selectedLga || 'Selected LGA'} Reports`} 
                            icon={EarningIcon} 
                        />
                    </Grid>                   
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalStateReports} 
                            details={selectedState ? `${selectedState} Reports` : 'State Reports'} 
                            icon={EarningIcon} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard 
                            count={totalOverallReports} 
                            details="Total Reports in Nigeria" 
                            icon={EarningIcon} 
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
                                reportCount: reportCounts[index]
                            }))}
                            type="reportTypes"
                            totalReportCount={reportCount}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {/* Top LGAs View */}
                        <PopularCard
                            title={`Top Reported Cases In ${selectedState || 'State'}`}
                            data={reportData}
                            totalReportCount={totalStateReports}
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
        </>
    );
};

export default DashboardPage;
