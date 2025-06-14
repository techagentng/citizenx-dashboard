import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSubReportsByCategory, getGovernorDetails } from 'services/reportService';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import BarChart from './barchart';
import PieChart from './piechart';
import tin from './tin.jpg';
import { gridSpacing } from 'store/constant';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    CircularProgress,
  } from '@mui/material';

const SubReportDetailsPage = () => {
    const [governor, setGovernor] = useState(null); // Initialize as null for better checking
    const [subReports, setSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { state: selectedState, lga: selectedLga } = useSelector((state) => state.graphs.lgaState);
    const { 
        reportType,  // The category ("Crime")
        state: geographicalState,
        count 
    } = location.state || {};
    
    useEffect(() => {
        const queryState = geographicalState || selectedState;
        if (queryState) {
            setLoading(true);
            getGovernorDetails(queryState)
                .then((data) => {
                    setGovernor(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [geographicalState, selectedState]);
    
    useEffect(() => {
        if (reportType) {  
            setLoading(true);
            getSubReportsByCategory(reportType)  
                .then((data) => {
                    const subReportsCount = data.reduce((acc, report) => {
                        acc[report.sub_report_type] = (acc[report.sub_report_type] || 0) + 1;
                        return acc;
                    }, {});
    
                    const structuredSubReports = Object.keys(subReportsCount).map((key) => ({
                        sub_report_type: key,
                        count: subReportsCount[key],
                    }));
    
                    setSubReports(structuredSubReports);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [reportType]);  

    return (
        <div>
            {/* Cards Section */}
            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* Governor Card */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="Governor"
                                                src={governor?.governor_image?.trim() ? governor.governor_image : tin}
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: 8,
                                                    objectFit: 'cover',
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
                                                {governor?.governor || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Deputy Card */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="Deputy"
                                                src={governor?.deputy_image?.trim() ? governor.deputy_image : tin}
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: 8,
                                                    objectFit: 'cover',
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
                                                {governor?.deputy_name || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* LGAC Card */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" alignItems="flex-start">
                                        <Grid item sx={{ width: '100%' }}>
                                            <img
                                                alt="LGAC"
                                                src={governor?.lgac_image?.trim() ? governor.lgac_image : tin}
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: 8,
                                                    objectFit: 'cover',
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
                                                {governor?.lgac || 'Coming soon ...'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Report Details Card */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card variant="outlined" sx={{ border: '1px solid #ccc', boxShadow: 'none', padding: 2 }}>
                                <CardContent>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                Report Type
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                 {reportType || 'N/A'} 
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                LGA
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {selectedLga || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                State
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {geographicalState || selectedState || 'N/A'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Charts Section */}
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

            <div>
      <Typography variant="h5" gutterBottom>
        SubReport Details for <strong>{selectedState}</strong>
      </Typography>

      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && subReports.length > 0 && (
            <TableContainer component={Paper} sx={{ maxWidth: 600, mb: 3 }}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><strong>Report Type</strong></TableCell>
                        <TableCell>{reportType || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>LGA</strong></TableCell>
                        <TableCell>{selectedLga || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>State</strong></TableCell>
                        <TableCell>{selectedState || 'N/A'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Count</strong></TableCell>
                        <TableCell>{count || 'N/A'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
      )}
    </div>
        </div>
    );
};

export default SubReportDetailsPage;