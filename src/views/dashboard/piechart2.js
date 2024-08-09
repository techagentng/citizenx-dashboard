import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart2 = ({ reportPercent, title }) => {
    const { good_percentage, bad_percentage } = reportPercent;

    const reportsPercentData = {
        labels: ['Good', 'Bad'],
        datasets: [
            {
                label: 'Report Percentage',
                data: [good_percentage, bad_percentage],
                backgroundColor: ['rgb(0,137,123)', 'rgb(16,72,51)'],
                borderColor: ['rgba(0,137,123,0.2)', 'rgba(16,72,51,0.2)'],
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{ width: '70%', paddingTop: '20px' }}>
            <Grid item>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            {good_percentage || bad_percentage ? <Pie data={reportsPercentData} /> : <p>Loading...</p>}
        </div>
    );
};

PieChart2.propTypes = {
    reportPercent: PropTypes.shape({
        good_percentage: PropTypes.number.isRequired,
        bad_percentage: PropTypes.number.isRequired
    }).isRequired,
    title: PropTypes.string
};

export default PieChart2;
