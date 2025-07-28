import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import PopularCard from './PopularCard';
import PopularCardAll from './PopularCardAll';
// import TopReportedStateCard from './TopReportedStateCard';
import BarChart from './barchart';
import PieChart from './piechart';
// import PieChart2 from './piechart2';
// import LineChart from './linechart';
import NigerianMap from './nigeria-map';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount, getAllReportsToday, getOnlineUsers, getTotalUserCount } from 'services/userService';

import { getStateReportCountList, getStateReportCountsAllx } from 'services/reportService';
import { getGraph, getPercentCount, setReportType } from 'store/slices/graphs';
import {
    getCategories,
    getReportCountsByState,
    getReportCountByState,
    getReportCount,
    getReportCountsByLGA,
    getReportCountByLGA
} from 'services/reportService';

const DashboardPage = () => {
    const dispatch = useDispatch();
    // const { total_states } = useSelector((state) => state.graphs.graphs);
    const { lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const selectedState = useSelector((state) => state.graphs.lgaState.state);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts } = useSelector((state) => state.graphs.graphs);
    // const { good_percentage, bad_percentage } = useSelector((state) => state.graphs.reportPercent);
    const [loading, setLoading] = useState(false);
const [setUserCount] = useState(0);
    const [, setTodayReportCount] = useState(0);
    const [, setOnlineUsers] = useState(0);
    const [, setReportTypes] = useState([]);
    const [selectedReportType, setSelectedReportType] = useState('Accidents');
    const [totalOverallReports, setTotalOverallReports] = useState(0);
    const [totalStateReports, setTotalStateReports] = useState(0);
    const [, setFormattedTopStates] = useState([]);
    const [, setTotalReportCounts] = useState([]);
    const [, setTotalLGAReports] = useState(0);
    const [reportData, setReportData] = useState(null);
    const [reportCount, setReportCount] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    // const totalStates = useSelector(state => state.graphs.graphs.total_states);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStateReportCountsAllx();

                if (!Array.isArray(data)) {
                    console.error('Expected data to be an array:', data);
                    return;
                }

                // Filter out valid state report entries
                const topStates = data.filter(item => item.state_name && item.report_count !== undefined);

                // Extract only the report counts
                const reportCountsArray = topStates.map(item => item.report_count);

                setFormattedTopStates(topStates);
                setTotalReportCounts(reportCountsArray);
            } catch (error) {
                console.error('Failed to fetch top state reports:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Fetch overall report count
        getReportCount()
            .then((data) => setTotalOverallReports(data.total_reports || 0))
            .catch((error) => console.error('Error fetching overall reports:', error));

        // Fetch state report count
        if (selectedState) {
            getReportCountByState(selectedState)
                .then((data) => setTotalStateReports(data.total_reports || 0))
                .catch((error) => console.error('Error fetching state reports:', error));
        }

        // Fetch LGA report count
        if (selectedLga) {
            getReportCountsByLGA(selectedLga)
                .then((data) => {
                    console.log('LGA Report Data:', data);
                    setTotalLGAReports(data?.total_reports || 0);
                })
                .catch((error) => console.error('Error fetching LGA reports:', error));
        }
    }, [selectedState, selectedLga]);

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
                setSelectedReportType(reportTypeOptions[0]);
                dispatch(setReportType(reportTypeOptions[0]));
            })
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, [dispatch]);
    // const defaultReportType = 'Accidents';
    // const handleReportTypeChange = (event) => {
    //     const reportType = event.target.value || defaultReportType;
    //     setSelectedReportType(reportType);
    //     console.log('Selected Report Type:', reportType);
    //     dispatch(setReportType(reportType));
    //     dispatch(getPercentCount(reportType, selectedState));
    // };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    // const todayReportCountSteroid = selectedState && topStates ? topStates[selectedState] || todayReportCount : todayReportCount;

    // const detailsText = selectedState ? `${selectedState} overall Report` : 'Total Report count';
    // const detailUsers = selectedState ? `${''} User post count` : "Today's Report";
    // const totalUsersCountSteroid = total_users || userCount;
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
        setLoading(true);
        getTotalUserCount()
            .then((count) => {
                console.log('User count from API:', count);
                setTotalUsers(count);
            })
            .catch((err) => {
                console.error('Failed to fetch user count:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div style={{ background: '#000', minHeight: '100vh' }}>
            <MainCard
                sx={{ background: 'transparent', boxShadow: 'none' }}
                title={
                    <Typography variant="h4" align="left">
                        State and LGA Dashboard
                    </Typography>
                }
            >
                <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                        <EarningCard count={totalUsers} details="Registered users" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard count={reportCount} details="Top LGA Report" icon={EarningIcon} />
                    </Grid>                   
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard count={totalStateReports} details="Total state reports" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EarningCard count={totalOverallReports} details="Overall report in Nigeria" icon={EarningIcon} />
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
                                    <Grid item xs={12} style={{ background: '#000',}}>
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
        </div>
    );
};

export default DashboardPage;
