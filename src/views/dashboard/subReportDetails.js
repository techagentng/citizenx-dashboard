import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSubReportsByCategory, getGovernorDetails } from 'services/reportService';
import { Card, CardContent, Grid, Typography, Box, Button, Alert } from '@mui/material';
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
    const [rawSubReports, setRawSubReports] = useState([]); // Store raw data with descriptions
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Items per page
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
            const queryState = geographicalState || selectedState;
            getSubReportsByCategory(reportType, queryState)  
                .then((data) => {
                    // Store raw data with descriptions
                    setRawSubReports(data);
                    setCurrentPage(1); // Reset to first page when new data loads
                    
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
    }, [reportType, geographicalState, selectedState]);  

    // Pagination logic
    const totalPages = Math.ceil(rawSubReports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = rawSubReports.slice(startIndex, endIndex);  

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>
                    Loading report details...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px" p={3}>
                <Alert severity="error" sx={{ mb: 3, maxWidth: 600 }}>
                    <Typography variant="h6" gutterBottom>
                        Data Not Available
                    </Typography>
                    <Typography variant="body1">
                        The data for this report has been removed or is no longer available. 
                        This could be due to maintenance, data updates, or temporary unavailability.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Error details: {error}
                    </Typography>
                </Alert>
                <Button 
                    variant="contained" 
                    onClick={() => window.history.back()}
                    sx={{ mr: 2 }}
                >
                    Go Back
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

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

      {/* Detailed Sub-Reports Table with Descriptions */}
      {!loading && !error && rawSubReports.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Detailed Sub-Reports for <strong>{reportType}</strong>
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Sub-Report Type</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>State</strong></TableCell>
                  <TableCell><strong>LGA</strong></TableCell>
                  <TableCell><strong>Date of Incidence</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((report, index) => (
                  <TableRow key={report.id || index}>
                    <TableCell>{report.sub_report_type || 'N/A'}</TableCell>
                    <TableCell>{report.description || 'No description available'}</TableCell>
                    <TableCell>{report.ReportType?.state_name || 'N/A'}</TableCell>
                    <TableCell>{report.ReportType?.lga_name || 'N/A'}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {report.ReportType?.date_of_incidence 
                          ? new Date(report.ReportType.date_of_incidence).toLocaleDateString() 
                          : 'N/A'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(endIndex, rawSubReports.length)} of {rawSubReports.length} items
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Previous Button */}
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: '40px', height: '40px', p: 0 }}
                >
                  &lt;
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  if (pageNum >= 1 && pageNum <= totalPages) {
                    return (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        variant={currentPage === pageNum ? "contained" : "outlined"}
                        size="small"
                        sx={{ minWidth: '40px', height: '40px', p: 0 }}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: '40px', height: '40px', p: 0 }}
                >
                  &gt;
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Page {currentPage} of {totalPages}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </div>
        </div>
    );
};

export default SubReportDetailsPage;