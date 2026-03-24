import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGovernorDetails } from 'services/reportService';
import { getIncidentReportsByCategory } from 'services/getIncidentReports';

import {
    Card,
    Grid,
    Typography,
    Box,
    Button,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import BarChart from './barchart';
import PieChart from './piechart';
import tin from './tin.jpg';
import { gridSpacing } from 'store/constant';

const SubReportDetailsPage = () => {
    const [governor, setGovernor] = useState(null);
    const [subReports, setSubReports] = useState([]);
    const [rawSubReports, setRawSubReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const location = useLocation();
    const { state: selectedState, lga: selectedLga } = useSelector(
        (state) => state.graphs.lgaState
    );

    const { reportType, state: geographicalState } = location.state || {};

    // Fetch governor
    useEffect(() => {
        const queryState = geographicalState || selectedState;
        if (!queryState) return;

        setLoading(true);
        getGovernorDetails(queryState)
            .then(setGovernor)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [geographicalState, selectedState]);

    // Fetch reports
    useEffect(() => {
        if (!reportType) return;

        setLoading(true);
        const queryState = geographicalState || selectedState;

        getIncidentReportsByCategory(reportType, queryState)
            .then((data) => {
                setRawSubReports(data);
                setCurrentPage(1);

                const counts = data.reduce((acc, item) => {
                    acc[item.sub_report_type] =
                        (acc[item.sub_report_type] || 0) + 1;
                    return acc;
                }, {});

                const formatted = Object.keys(counts).map((key) => ({
                    sub_report_type: key,
                    count: counts[key]
                }));

                setSubReports(formatted);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [reportType, geographicalState, selectedState]);

    // Pagination
    const totalPages = Math.ceil(rawSubReports.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = rawSubReports.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Loading
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    // Error
    if (error) {
        return (
            <Alert severity="error">
                Error: {error}
            </Alert>
        );
    }

    return (
        <div>
            {/* ================= CARDS ================= */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2}>
                    {/* Governor */}
                    <Grid item xs={12} md={3}>
                        <img
                            src={
                                governor?.governor_image?.trim()
                                    ? governor.governor_image
                                    : tin
                            }
                            alt="Governor"
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                        <Typography variant="h6">
                            {governor?.governor || 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Deputy */}
                    <Grid item xs={12} md={3}>
                        <img
                            src={
                                governor?.deputy_image?.trim()
                                    ? governor.deputy_image
                                    : tin
                            }
                            alt="Deputy"
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                        <Typography variant="h6">
                            {governor?.deputy_name || 'N/A'}
                        </Typography>
                    </Grid>

                    {/* LGAC */}
                    <Grid item xs={12} md={3}>
                        <img
                            src={
                                governor?.lgac_image?.trim()
                                    ? governor.lgac_image
                                    : tin
                            }
                            alt="LGAC"
                            style={{ width: '100%', borderRadius: 8 }}
                        />
                        <Typography variant="h6">
                            {governor?.lgac || 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Info */}
                    <Grid item xs={12} md={3}>
                        <Typography><b>Report:</b> {reportType}</Typography>
                        <Typography><b>State:</b> {geographicalState || selectedState}</Typography>
                        <Typography><b>LGA:</b> {selectedLga}</Typography>
                    </Grid>
                </Grid>
            </Card>

            {/* ================= CHARTS ================= */}
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <MainCard>
                        <PieChart
                            reportTypes={subReports.map(r => r.sub_report_type)}
                            reportCounts={subReports.map(r => r.count)}
                        />
                    </MainCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <MainCard>
                        <BarChart
                            reportTypes={subReports.map(r => r.sub_report_type)}
                            reportCounts={subReports.map(r => r.count)}
                        />
                    </MainCard>
                </Grid>
            </Grid>

            {/* ================= TABLE ================= */}
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Sub Report Details
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Sub Report Type</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell>
                                        {item.sub_report_type}
                                    </TableCell>
                                    <TableCell>
                                        {item.description || 'N/A'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ================= PAGINATION ================= */}
                {totalPages > 1 && (
                    <Box
                        mt={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            Prev
                        </Button>

                        <Typography>
                            Page {currentPage} of {totalPages}
                        </Typography>

                        <Button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default SubReportDetailsPage;