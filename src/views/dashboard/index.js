// material-ui
import { Grid } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
// project imports
// import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
// import MarkersPopups from 'ui-component/third-party/map/';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount } from 'services/userService';
// ==============================|| SAMPLE PAGE ||============================== //

const DashboardPage = ({ isLoading }) => {
    const { isLoggedIn } = useContext(JWTContext);
    const [userCount, setUserCount] = useState(0);
    // Fetch users data on component mount
    useEffect(() => {
        if (isLoggedIn) {
            getAllUserCount()
                .then((data) => {
                    setUserCount(data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    }, [isLoggedIn]);

    return (
        <>
            <MainCard title="Dashboard Page">
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <EarningCard count="106" details="Todays Report" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={userCount} details="Total Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="176" details="Active Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="230" details="Average Daily Users" icon={EarningIcon}></EarningCard>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={10}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                        {/* <MainCard title="Markers & Popups">
                        <MarkersPopups
                            {...mapConfiguration}
                            data={countries}
                            mapStyle={theme.palette.mode === 'dark' ? MAPBOX_THEMES.dark : MAPBOX_THEMES.light}
                        />
                    </MainCard> */}
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};
export default DashboardPage;
