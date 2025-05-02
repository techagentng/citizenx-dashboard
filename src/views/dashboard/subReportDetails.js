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
    TableHead,
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
    const { state, count } = location.state || {};
    const { state: selectedState, lga } = useSelector((state) => state.graphs.lgaState);

    // Fetch governor details
    useEffect(() => {
        if (selectedState) {
            setLoading(true); // Reset loading state
            getGovernorDetails(selectedState)
                .then((data) => {
                    // Handle Google Drive URLs if needed (uncomment if applicable)
                    /*
                    if (data.governor_image?.includes('drive.google.com')) {
                        const match = data.governor_image.match(/d\/([a-zA-Z0-9_-]+)/);
                        if (match && match[1]) {
                            data.governor_image = `https://drive.google.com/uc?export=view&id=${match[1]}`;
                        }
                    }
                    */
                    setGovernor(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [selectedState]);

    // Fetch sub-reports
    useEffect(() => {
        if (state) {
            setLoading(true); // Reset loading state
            getSubReportsByCategory(state)
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
    }, [state]);

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
                                                src={governor?.governor_image || tin}
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
                                                src={governor?.deputy_image || tin}
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
                                                src={governor?.lgac_image || tin}
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
                                                {state || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                LGA
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {lga || 'N/A'}
                                            </Typography>
                                        </Grid>
                                        <Grid item container justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                State
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {governor?.state || selectedState || 'N/A'}
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

      <TableContainer component={Paper} sx={{ maxWidth: 600, mb: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Report Type</strong></TableCell>
              <TableCell>{state || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>LGA</strong></TableCell>
              <TableCell>{lga || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>State</strong></TableCell>
              <TableCell>{governor?.state || selectedState || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Count</strong></TableCell>
              <TableCell>{count || 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && subReports.length > 0 && (
        <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Sub Report Type</strong></TableCell>
                <TableCell><strong>Occurrences</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subReports.map((subReport) => (
                <TableRow key={subReport.sub_report_type}>
                  <TableCell>{subReport.sub_report_type}</TableCell>
                  <TableCell>{subReport.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>n
        </div>
    );
};

export default SubReportDetailsPage;