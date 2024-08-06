import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
import PopularCard from './PopularCard';
import BarChart from './barchart';
import PieChart from './piechart';
import PieChart2 from './piechart2';
import LineChart from './linechart';
import NigerianMap from './nigeria-map';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount, getAllReportsToday, getOnlineUsers } from 'services/userService';
import { getStateReportCountList } from 'services/reportService';
import { getGraph, getPercentCount } from 'store/slices/graphs';
import CompareForms from './CompareForms';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { state: selectedState, lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts, topStates, total_users, loading, error } = useSelector((state) => state.graphs.graphs);
    const { good_percentage, bad_percentage } = useSelector((state) => state.graphs.reportPercent);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [formattedTopStates, setFormattedTopStates] = useState([]);
    const [, setSelectedReportType] = useState('');

    useEffect(() => {
        if (selectedState && selectedLga) {
            dispatch(getGraph(selectedState, selectedLga));
        }
    }, [dispatch, selectedState, selectedLga]);

    useEffect(() => {
        if (reportTypes && Array.isArray(reportTypes) && selectedState) {
            dispatch(getPercentCount(reportTypes, selectedState));
        }
    }, [dispatch, reportTypes, selectedState]);

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
        if (reportTypes?.length > 0) {
            setSelectedReportType(reportTypes[0]); 
        }
    }, [reportTypes]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const todayReportCountSteroid = topStates[selectedState] || todayReportCount;
    const detailsText = selectedState ? `${selectedState}'s Report` : "Today's Report";
    const detailUsers = selectedState ? `${selectedState}'s Report` : "Today's Report";
    const totalUsersCountSteroid = total_users || userCount;
    // const pieChartTitle = selectedReportType ? `Good and Bad Rating for ${selectedReportType}` : 'Good and Bad Rating';

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
                            title="Popular Report Types"
                            data={reportTypes?.map((type, index) => ({
                                reportType: type,
                                reportCount: reportCounts[index]
                            }))}
                            type="reportTypes"
                        />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <PopularCard title="Popular States" data={formattedTopStates} type="states" />
                    </Grid>
                    <Grid item xs={12} md={3}>
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
