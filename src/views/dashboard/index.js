// material-ui
import { Grid } from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import BarChart from './barchart';
import PieChart from './piechart';
import PieChart2 from './piechart2';
import LineChart from './linechart';
import { getGraph, getPercentCount } from 'store/slices/graphs';
// import mapData from './nigeria-map';
// import { GeoJSON } from 'react-geo';
import CompareForms from './CompareForms';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { state: selectedState, lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const { isLoggedIn } = useContext(JWTContext);
    const { reportTypes, reportCounts, loading, error } = useSelector((state) => state.graphs.graphs);
    const { good_percentage, bad_percentage } = useSelector((state) => state.graphs.reportPercent);
    const [userCount, setUserCount] = useState(0);
    const [todayReportCount, setTodayReportCount] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState(0);

        // Log good_percentage and bad_percentage
        console.log('Good Percentage:', good_percentage);
        console.log('Bad Percentage:', bad_percentage);

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
    }, [isLoggedIn, setTodayReportCount]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <MainCard title="State and LGA dashboard">
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
                        <MainCard title="Markers & Popups">
                            {/* <GeoJSON data={mapData} fill="#eee" stroke="black" strokeWidth={0.5} /> */}
                            {/* <NigeriaMap /> */}
                            {/* <MapContainer
                                bounds={nigeriaBounds}
                                zoom={6}
                                style={{ height: '100vh', width: '100%' }}
                                scrollWheelZoom={false}
                                maxBounds={nigeriaBounds} // Set the max bounds to constrain the map to Nigeria
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                {markers.map((marker, index) => (
                                    <Marker key={index} position={[marker.lat, marker.lng]}>
                                        <Popup>{marker.popup}</Popup>
                                    </Marker>
                                ))}
                            </MapContainer> */}
                        </MainCard>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <PopularCard reportTypes={reportTypes} title="Popular Reports" reportCounts={reportCounts} />
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <PopularCard reportTypes={reportTypes} title="Popular States" reportCounts={reportCounts} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <PieChart2 reportTypes={reportTypes} reportPercent={{ good_percentage, bad_percentage }} />
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
