// material-ui
import { Grid } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import EarningCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/earning.svg';
// import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import { gridSpacing } from 'store/constant';
import JWTContext from 'contexts/JWTContext';
import { getAllUserCount, getAllReportsToday, getOnlineUsers } from 'services/userService';
// React Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import BarChart from './barchart';
import PieChart from './piechart';

// Fix the default icon issue
// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const DashboardPage = ({ isLoading }) => {
    const { isLoggedIn } = useContext(JWTContext);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);

    const nigeriaPosition = [9.082, 8.6753]; // Latitude and Longitude for Nigeria

    // Bounds to show only Nigeria
    const nigeriaBounds = [
        [4.24, 2.6769], // Southwest corner
        [13.8904, 14.678] // Northeast corner
    ];

    // Fetch users data on component mount
    useEffect(() => {
        if (isLoggedIn) {
            console.log('Fetching user data, report data, and online users');
            Promise.all([getAllUserCount(), getAllReportsToday(), getOnlineUsers()])
                .then(([userCountData, todayReportCountData, onlineUserData]) => {
                    console.log('User count:', userCountData);
                    console.log('Today report count:', todayReportCountData);
                    console.log('Online users data:', onlineUserData);

                    setUserCount(userCountData);
                    setTodayReportCount(todayReportCountData);
                    setOnlineUsers(onlineUserData); // Set the count correctly
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
                        <EarningCard count={todayReportCount} details="Today's Report" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={userCount} details="Total Users" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count={onlineUsers} details="Active Users" icon={EarningIcon} />
                    </Grid>
                    <Grid item xs={3}>
                        <EarningCard count="230" details="Average Daily Users" icon={EarningIcon} />
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={10}>
                        <MainCard title="Markers & Popups">
                            <MapContainer bounds={nigeriaBounds} style={{ height: '100vh', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={nigeriaPosition}>
                                    <Popup>Nigeria</Popup>
                                </Marker>
                            </MapContainer>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <BarChart sx={{ width: 'calc(50% - 8px)', mt:18 }}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PieChart />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default DashboardPage;
