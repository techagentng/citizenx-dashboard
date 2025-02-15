import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSubReportsByCategory } from 'services/reportService';
import { useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import tin from './tin.jpg';
import BarChart from './barchart';
import PieChart from './piechart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// import { getPercentCount } from 'store/slices/graphs';
// import PieChart from './piechart';

const SubReportDetailsPage = () => {
    const location = useLocation();
    const { state, count } = location.state || {};
    const [subReports, setSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state: selectedState, lga } = useSelector((state) => state.graphs.lgaState);
    // const dispatch = useDispatch();

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
                                        <Grid item>
                                            <img alt="Icon" src={tin} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Governor
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                John Doe
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Second Card with Deputy info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item>
                                            <img alt="Icon" src={tin} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Deputy
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                Jane Smith
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Third Card with Local Government Chairman info */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item>
                                            <img alt="Icon" src={tin} style={{ width: 56, height: 56, borderRadius: '50%' }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle2" color="textSecondary">
                                                Local Government Chairman
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                50
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
