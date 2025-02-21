import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, TextField, MenuItem, Box, Typography, Avatar, CardContent, Card } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
// import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
// import EarningIcon from 'assets/images/icons/earning.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PopularCard from './PopularCard';
// import PopularCard2 from './PopularCard2';
import BarChart from './barchart';
import PieChart from './piechart';
import PieChart2 from './piechart2';
// import LineChart from './linechart';
import NigerianMap from './nigeria-map';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount, getAllReportsToday, getOnlineUsers } from 'services/userService';
import { getStateReportCountList } from 'services/reportService';
import { getGraph, getPercentCount, setReportType } from 'store/slices/graphs';
import { getCategories, getReportCountsByState, getReportCountByState, getReportCount, getReportCountsByLGA } from 'services/reportService';
import CompareForms from './CompareForms';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const selectedState = useSelector((state) => state.graphs.lgaState.state);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts, topStates, total_users } = useSelector((state) => state.graphs.graphs);
    const { good_percentage, bad_percentage } = useSelector((state) => state.graphs.reportPercent);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [formattedTopStates, setFormattedTopStates] = useState([]);
    const [reportTypeOptions, setReportTypes] = useState([]);
    const [selectedReportType, setSelectedReportType] = useState('Accidents');
    // const [lgas, setLgas] = useState([]);
    // const [lgareportCounts, setLgaReportCounts] = useState([]);
    const [totalOverallReports, setTotalOverallReports] = useState(0);
    const [totalStateReports, setTotalStateReports] = useState(0);
    const [totalLGAReports, setTotalLGAReports] = useState(0);
    const [reportData, setReportData] = useState(null);

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
    const defaultReportType = 'Accidents';
    const handleReportTypeChange = (event) => {
        const reportType = event.target.value || defaultReportType;
        setSelectedReportType(reportType);
        console.log('Selected Report Type:', reportType);
        dispatch(setReportType(reportType));
        dispatch(getPercentCount(reportType, selectedState));
    };

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    const todayReportCountSteroid = selectedState && topStates ? topStates[selectedState] || todayReportCount : todayReportCount;

    const detailsText = selectedState ? `${selectedState}'s Overall Report` : "Today's Report";
    const detailUsers = selectedState ? `${selectedState}'s Overall Report` : "Today's Report";
    const totalUsersCountSteroid = total_users || userCount;

    const CardWrapper = ({ border = true, children }) => {
        return (
            <Card
                sx={{
                    border: border ? '1px solid #e0e0e0' : 'none', // Conditional border
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'background.paper',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <CardContent>{children}</CardContent>
            </Card>
        );
    };
    
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
                    {/* Card 1 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <CardWrapper border={false}>
                            <Box
                                sx={{
                                    p: isMobile ? 1 : 1.25,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid container direction="column" spacing={isMobile ? 1 : 2}>
                                    <Grid item>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: getFontSize(),
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: isMobile ? 1 : 1.75,
                                                        mb: isMobile ? 0.5 : 0.75
                                                    }}
                                                >
                                                    {todayReportCountSteroid}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        cursor: 'pointer',
                                                        width: isMobile ? 24 : 32,
                                                        height: isMobile ? 24 : 32,
                                                        backgroundColor: theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                        color: theme.palette.secondary.dark || '#000' // Fallback color
                                                    }}
                                                >
                                                    <ArrowUpwardIcon
                                                        fontSize={isMobile ? 'small' : 'inherit'}
                                                        sx={{ transform: 'rotate(45deg)' }}
                                                    />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ mb: isMobile ? 0.75 : 1.25 }}>
                                        <Typography
                                            sx={{
                                                fontSize: getDetailsFontSize(),
                                                fontWeight: 500,
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                lineHeight: 1.3
                                            }}
                                        >
                                            {detailsText}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardWrapper>
                    </Grid>

                    {/* Card 2 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <CardWrapper border={false}>
                            <Box
                                sx={{
                                    p: isMobile ? 1 : 1.25,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid container direction="column" spacing={isMobile ? 1 : 2}>
                                    <Grid item>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: getFontSize(),
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: isMobile ? 1 : 1.75,
                                                        mb: isMobile ? 0.5 : 0.75
                                                    }}
                                                >
                                                    {totalUsersCountSteroid}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        cursor: 'pointer',
                                                        width: isMobile ? 24 : 32,
                                                        height: isMobile ? 24 : 32,
                                                        backgroundColor: theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                        color: theme.palette.secondary.dark || '#000' // Fallback color
                                                    }}
                                                >
                                                    <ArrowUpwardIcon
                                                        fontSize={isMobile ? 'small' : 'inherit'}
                                                        sx={{ transform: 'rotate(45deg)' }}
                                                    />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ mb: isMobile ? 0.75 : 1.25 }}>
                                        <Typography
                                            sx={{
                                                fontSize: getDetailsFontSize(),
                                                fontWeight: 500,
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                lineHeight: 1.3
                                            }}
                                        >
                                            {detailUsers}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardWrapper>
                    </Grid>

                    {/* Card 3 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <CardWrapper border={false}>
                            <Box
                                sx={{
                                    p: isMobile ? 1 : 1.25,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid container direction="column" spacing={isMobile ? 1 : 2}>
                                    <Grid item>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: getFontSize(),
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: isMobile ? 1 : 1.75,
                                                        mb: isMobile ? 0.5 : 0.75
                                                    }}
                                                >
                                                    {onlineUsers}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        cursor: 'pointer',
                                                        width: isMobile ? 24 : 32,
                                                        height: isMobile ? 24 : 32,
                                                        backgroundColor: theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                        color: theme.palette.secondary.dark || '#000' // Fallback color
                                                    }}
                                                >
                                                    <ArrowUpwardIcon
                                                        fontSize={isMobile ? 'small' : 'inherit'}
                                                        sx={{ transform: 'rotate(45deg)' }}
                                                    />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ mb: isMobile ? 0.75 : 1.25 }}>
                                        <Typography
                                            sx={{
                                                fontSize: getDetailsFontSize(),
                                                fontWeight: 500,
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                lineHeight: 1.3
                                            }}
                                        >
                                            Active Users
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardWrapper>
                    </Grid>

                    {/* Card 4 */}
                    <Grid item xs={12} sm={6} md={3}>
                        <CardWrapper border={false}>
                            <Box
                                sx={{
                                    p: isMobile ? 1 : 1.25,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                <Grid container direction="column" spacing={isMobile ? 1 : 2}>
                                    <Grid item>
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item>
                                                <Typography
                                                    sx={{
                                                        fontSize: getFontSize(),
                                                        fontWeight: 500,
                                                        mr: 1,
                                                        mt: isMobile ? 1 : 1.75,
                                                        mb: isMobile ? 0.5 : 0.75
                                                    }}
                                                >
                                                    230
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Avatar
                                                    sx={{
                                                        cursor: 'pointer',
                                                        width: isMobile ? 24 : 32,
                                                        height: isMobile ? 24 : 32,
                                                        backgroundColor: theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                        color: theme.palette.secondary.dark || '#000' // Fallback color
                                                    }}
                                                >
                                                    <ArrowUpwardIcon
                                                        fontSize={isMobile ? 'small' : 'inherit'}
                                                        sx={{ transform: 'rotate(45deg)' }}
                                                    />
                                                </Avatar>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ mb: isMobile ? 0.75 : 1.25 }}>
                                        <Typography
                                            sx={{
                                                fontSize: getDetailsFontSize(),
                                                fontWeight: 500,
                                                color:
                                                    theme.palette.mode === 'dark'
                                                        ? theme.palette.text.secondary
                                                        : theme.palette.secondary[200] || '#e0e0e0', // Fallback color
                                                lineHeight: 1.3
                                            }}
                                        >
                                            Average Daily Users
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardWrapper>
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
                                        <PieChart reportTypes={reportTypes} reportCounts={reportCounts} />
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
                            <NigerianMap />
                        </MainCard>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <PopularCard
                            title={`Top Reported cases in ${selectedLga || 'LGA'}`}
                            data={reportTypes?.map((type, index) => ({
                                reportType: type,
                                reportCount: reportCounts[index]
                            }))}
                            type="reportTypes"
                            totalReportCount={totalLGAReports}
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        {/* Top LGAs View */}
                        <PopularCard
                            title={`Top Reported Cases In ${selectedState || 'State'}`}
                            data={reportData}
                            totalReportCount={totalStateReports}
                        />
                    </Grid>

                    <Grid item xs={6} md={4}>
                        <PopularCard
                            title="Top Reported States in Nigeria"
                            data={formattedTopStates}
                            type="states"
                            totalReportCount={totalOverallReports}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ backgroundColor: 'white' }}>
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
