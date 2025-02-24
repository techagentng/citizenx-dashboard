import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSubReportsByCategory, getGovernorDetails } from 'services/reportService';
import { useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import tin from './tin.jpg';
import BarChart from './barchart';
import PieChart from './piechart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import { getPercentCount } from 'store/slices/graphs';
// import PieChart from './piechart';
import lagos from './Lagos Gov.jpg';
import bauchi from './Bauchi Gov.jpg';
import abia from './Lagos Gov.jpg';
import anambra from './Anambara Gov.jpg';

const SubReportDetailsPage = () => {
    const [governor, setGovernor] = useState({});
    const location = useLocation();
    const { state, count } = location.state || {};
    const [subReports, setSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state: selectedState, lga } = useSelector((state) => state.graphs.lgaState);
    // const dispatch = useDispatch();

    const stateImages = {
        lagos: lagos,
        anambra: anambra,
        abia: abia,
        bauchi: bauchi
    };

    // useEffect(() => {
    //     if (selectedState) {
    //         getGovernorDetails(selectedState)
    //             .then((data) => {
    //                 if (data.governor_image.includes('drive.google.com')) {
    //                     // Extract the file ID from the original Google Drive URL
    //                     const match = data.governor_image.match(/d\/([a-zA-Z0-9_-]+)/);
    //                     if (match && match[1]) {
    //                         // Construct a direct Google Drive image URL
    //                         data.governor_image = `https://drive.google.com/uc?export=view&id=${match[1]}`;
    //                     }
    //                 }
    //                 setGovernor(data);
    //                 setLoading(false);
    //             })
    //             .catch((err) => {
    //                 setError(err.message);
    //                 setLoading(false);
    //             });
    //     }
    // }, [selectedState]);
    useEffect(() => {
        if (selectedState) {
            // Fetch governor details without image
            getGovernorDetails(selectedState)
                .then((data) => {
                    // Remove image from server response, use local image instead
                    const governorData = { ...data, governor_image: stateImages[selectedState.toLowerCase()] || tin }; // Fallback to tin
                    setGovernor(governorData);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [selectedState]);

    useEffect(() => {
        if (state) {
            getSubReportsByCategory(state)
                .then((data) => {
                    const subReportsCount = data.reduce((acc, report) => {
                        if (acc[report.sub_report_type]) {
                            acc[report.sub_report_type] += 1; // Increment count if the type already exists
                        } else {
                            acc[report.sub_report_type] = 1; // Initialize count if the type is new
                        }
                        return acc;
                    }, {});

                    const structuredSubReports = Object.keys(subReportsCount).map((key) => ({
                        sub_report_type: key,
                        count: subReportsCount[key]
                    }));

                    setSubReports(structuredSubReports);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [state]);

    return (
        <div>
            {/* Card section for displaying various details */}
            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* First Card with Governor info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="Icon"
                                                src={governor.governor_image}
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1', // Ensures the image remains square
                                                    borderRadius: 8,
                                                    objectFit: 'cover' // Ensures the image fills the container properly
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Governor
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {governor.governor}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="Icon"
                                                src={deputy.deputy_image} // Assuming `deputy` contains the deputy image
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1', // Ensures the image remains square
                                                    borderRadius: 8,
                                                    objectFit: 'cover' // Ensures the image fills the container properly
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Deputy
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {deputy.deputy} {/* Assuming `deputy` contains the name */}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="Icon"
                                                src={chairman.chairman_image || tin} // Use default `tin` if no image available
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1', // Ensures the image remains square
                                                    borderRadius: 8,
                                                    objectFit: 'cover' // Ensures the image fills the container properly
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Local Government Chairman
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                {chairman.chairman || 'Coming soon ...'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Fourth Card with report details */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                Report Type
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {state}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                LGA
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {lga}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                State
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {selectedState}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Chart section */}
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <MainCard content={false}>
                        <Grid container>
                            <Grid item xs={12}>
                                <PieChart
                                    reportTypes={subReports.map((report) => report.sub_report_type)}
                                    reportCounts={subReports.map((report) => report.count)}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <MainCard content={false}>
                        <Grid container>
                            <Grid item xs={12}>
                                <BarChart
                                    reportTypes={subReports.map((report) => report.sub_report_type)}
                                    reportCounts={subReports.map((report) => report.count)}
                                />
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>

            {/* SubReport Details */}
            <h1>SubReport details page for {selectedState} </h1>
            <p>Report Type: {state}</p>
            <p>LGA: {lga}</p>
            <p>State: {selectedState}</p>
            <p>Count: {count}</p>

            {loading && <p>Loading sub-reports...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <ul>
                    {subReports.map((subReport) => (
                        <li key={subReport.sub_report_type}>
                            {subReport.sub_report_type}: {subReport.count} occurrences
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubReportDetailsPage;
