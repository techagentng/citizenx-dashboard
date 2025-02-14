import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import useConfig from 'hooks/useConfig';
import getChartData from './bajaj-area-chart';
import { getReportCountsByState } from 'services/reportService';

const BajajAreaChartCard = ({ reportType, stateName, totalReportCount }) => {
    const theme = useTheme();
    const { navType } = useConfig();
    const orangeDark = theme.palette.secondary[800];
 
    // const [totalReportCount, setTotalReportCount] = useState(null);
    const [chartData, setChartData] = useState({
        type: 'area',
        height: 95,
        options: {
            chart: {
                id: 'support-chart',
                sparkline: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 1
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: () => 'Data '
                    }
                },
                marker: {
                    show: false
                }
            }
        },
        series: [
            {
                data: [0, 15, 10, 50, 30, 40, 25]
            }
        ]
    });
    const [, setError] = useState('');
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchReportCount = async () => {
    //         try {
    //             const count = await getTotalReportCount();
    //             setTotalReportCount(count);
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };

    //     fetchReportCount();
    // }, []);

    useEffect(() => {
        if (stateName) {
            const fetchChartData = async () => {
                try {
                    const data = await getReportCountsByState(stateName);
                    setChartData(getChartData(reportType, data));
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchChartData();
        }
    }, [stateName, reportType]);

    useEffect(() => {
        const newSupportChart = {
            ...chartData.options,
            colors: [orangeDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };
        if (chartData && chartData.options) {
            ApexCharts.exec('support-chart', 'updateOptions', newSupportChart);
        }
    }, [navType, orangeDark, chartData.options, chartData]);

    return (
        <Card sx={{ bgcolor: 'secondary.light' }}>
            <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                                {reportType === 'topReports'
                                    ? `Top Reports for ${stateName}`
                                    : reportType === 'topLGAs'
                                      ? `Top LGAs for ${stateName}`
                                      : 'Overall Report Count'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                            {totalReportCount !== null ? totalReportCount : 'Loading...'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Chart
                        type={chartData.type || 'area'}
                        height={chartData.height || 235}
                        options={chartData.options || {}}
                        series={chartData.series || []}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default BajajAreaChartCard;
