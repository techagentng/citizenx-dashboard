import React, { useState, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import chartData from './chart-data/bajaj-area-chart';
import { getTotalReportCount } from 'services/reportService';
// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
    const theme = useTheme();
    const { navType } = useConfig();

    const orangeDark = theme.palette.secondary[800];
    const [totalReportCount, setTotalReportCount] = useState(null);
    const [, setError] = useState('');
    const [, setLoading] = useState('');
    useEffect(() => {
        const fetchReportCount = async () => {
            try {
                const count = await getTotalReportCount();
                setTotalReportCount(count);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReportCount();
    }, []);

    React.useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };
        ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
    }, [navType, orangeDark]);

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                State Reports
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                            {totalReportCount}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                        10% Profit
                    </Typography> */}
                </Grid>
            </Grid>
            <Chart {...chartData} />
        </Card>
    );
};

export default BajajAreaChartCard;
