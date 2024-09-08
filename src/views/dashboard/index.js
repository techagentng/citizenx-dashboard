import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, MenuItem, Box, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import PopularCard from './PopularCard';
// import PopularCard2 from './PopularCard2';
import BarChart from './barchart';
import PieChart from './piechart';
import PieChart2 from './piechart2';
import LineChart from './linechart';
import NigerianMap from './nigeria-map';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount, getAllReportsToday, getOnlineUsers } from 'services/userService';
import { getStateReportCountList } from 'services/reportService';
import { getGraph, getPercentCount, setReportType } from 'store/slices/graphs';
import { getCategories, getReportCountsByState } from 'services/reportService';
import CompareForms from './CompareForms';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const selectedState = useSelector((state) => state.graphs.lgaState.state);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts, topStates, total_users, loading, error } = useSelector((state) => state.graphs.graphs);
    const { good_percentage, bad_percentage } = useSelector((state) => state.graphs.reportPercent);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [formattedTopStates, setFormattedTopStates] = useState([]);
    const [reportTypeOptions, setReportTypes] = useState([]);
    const [selectedReportType, setSelectedReportType] = useState('');
    // const [lgas, setLgas] = useState([]);
    // const [lgareportCounts, setLgaReportCounts] = useState([]);
    const [reportData, setReportData] = useState(null);
    useEffect(() => {
        if (selectedState) {
            // setLoading(true);
            getReportCountsByState(selectedState)
                .then((data) => {
                    setReportData(
                        data.lgas.map((lga, index) => ({
                            lgaName: lga,
                            reportCount: data.report_counts[index]
                        }))
                    );
                    // setLoading(false);
                })
                .catch((err) => {
                    // setError(err);
                    // setLoading(false);
                    console.log(err);
                });
        }
    }, [selectedState]);

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

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([getAllUserCount(), getAllReportsToday(), getOnlineUsers()])
                .then(([userCountData, todayReportCountData, onlineUserData]) => {
                    setUserCount(userCountData);
                    setTodayReportCount(todayReportCountData);
                    setOnlineUsers(onlineUserData);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        getStateReportCountList()
            .then((data) => {
                setFormattedTopStates(
                    data.map((state) => ({
                        stateName: state.state_name,
                        reportCount: state.report_count
                    }))
                );
            })
            .catch((error) => {
                console.error('Failed to fetch top states:', error);
            });
    }, []);

    useEffect(() => {
        getCategories()
            .then((types) => {
                const reportTypeOptions = ['Select Report Type', ...types];
                setReportTypes(reportTypeOptions);
                setSelectedReportType(reportTypeOptions[0]); // Set initial selected report type
                dispatch(setReportType(reportTypeOptions[0])); // Initialize global state
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, [dispatch]);

    const handleReportTypeChange = (event) => {
        const reportType = event.target.value;
        setSelectedReportType(reportType);
        console.log('Selected Report Type:', reportType);
        dispatch(setReportType(reportType));
        dispatch(getPercentCount(reportType, selectedState));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const todayReportCountSteroid = selectedState && topStates ? topStates[selectedState] || todayReportCount : todayReportCount;

    const detailsText = selectedState ? `${selectedState}'s Report` : "Today's Report";
    const detailUsers = selectedState ? `${selectedState}'s Report` : "Today's Report";
    const totalUsersCountSteroid = total_users || userCount;
    return (
        <>
            <MainCard title="State and LGA dashboard">
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={3}>
                        <EarningCard count={todayReportCountSteroid} details={detailsText} icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={totalUsersCountSteroid} details={detailUsers} icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={onlineUsers} details="Active Users" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="230" details="Average Daily Users" icon={EarningIcon} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} justifyContent="center" alignItems="flex-end">
                    {!reportTypes || reportTypes.length === 0 ? (
                        <Grid item xs={12}>
                            <p>No data available for the selected state and LGA.</p>
                        </Grid>
                    ) : (
                        <>
                            <Grid item xs={12} md={6}>
                                <BarChart reportTypes={reportTypes} reportCounts={reportCounts} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <PieChart reportTypes={reportTypes} reportCounts={reportCounts} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <LineChart reportTypes={reportTypes} reportCounts={reportCounts} />
                            </Grid>
                        </>
                    )}
                </Grid>

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <MainCard title="State and Report Count">
                            <NigerianMap />
                        </MainCard>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <PopularCard
                            title={`Top Reports for ${selectedState || 'State'}`}
                            data={reportTypes?.map((type, index) => ({
                                reportType: type,
                                reportCount: reportCounts[index]
                            }))}
                            type="reportTypes"
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        {/* Top LGAs View */}
                        <PopularCard title={`Top LGAs for ${selectedState || 'State'}`} data={reportData} />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <PopularCard title="Popular States" data={formattedTopStates} type="states" />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ backgroundColor: 'white' }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={2} // Optional padding for better spacing
                        >
                            <Typography variant='h3'>Overall Ratings</Typography>
                            <TextField
                                id="standard-select-currency-1"
                                label="Select Report Type"
                                select
                                value={selectedReportType || ''}
                                onChange={handleReportTypeChange}
                                sx={{ minWidth: 200 }} // Adjust width as needed
                            >
                                {reportTypeOptions.map((type) => (
                                    <MenuItem key={type} value={type} disabled={type === 'Select Report Type'}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <PieChart2 title="" reportPercent={{ good_percentage, bad_percentage }} />
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title="Compare reports">
                <Grid item xs={12} md={6}>
                    <CompareForms />
                </Grid>
            </MainCard>
        </>
    );
};

export default DashboardPage;
