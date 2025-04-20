import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatePieChart = ({ data = [], title }) => { // Rename prop to "data"
    const reportTypes = Array.isArray(data) ? data.map((item) => item.report_type) : [];
    const counts = Array.isArray(data) ? data.map((item) => item.count) : [];

    const pieChartData = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Reports by Type',
                data: counts,
                backgroundColor: ['#00796B', '#8E44AD', '#E67E22', '#2980B9', '#D35400', '#16A085'],
                borderColor: [
                    'rgba(0, 121, 107, 0.2)',
                    'rgba(142, 68, 173, 0.2)',
                    'rgba(230, 126, 34, 0.2)',
                    'rgba(41, 128, 185, 0.2)',
                    'rgba(211, 84, 0, 0.2)',
                    'rgba(22, 160, 133, 0.2)'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{ width: '70%', paddingTop: '20px' }}>
            <Grid item>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            {data && data.length > 0 ? <Pie data={pieChartData} /> : <p>No data available</p>}
        </div>
    );
};

StatePieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            report_type: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired
        })
    ),
    title: PropTypes.string
};

export default StatePieChart;