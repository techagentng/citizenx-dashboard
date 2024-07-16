import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart2 = ({ reportTypes, reportPercent }) => {
    const reportsPercentData = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Percentage',
                data: [reportPercent.good_percentage, reportPercent.bad_percentage],
                backgroundColor: ['rgb(0,137,123)', 'rgb(16,72,51)', 'rgb(167,227,225)', 'rgb(0,105,92)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }
        ]
    };

    return <div style={{ width: '100%' }}>{reportTypes && reportPercent ? <Pie data={reportsPercentData} /> : <p>Loading...</p>}</div>;
};

PieChart2.propTypes = {
    reportTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    reportPercent: PropTypes.shape({
        good_percentage: PropTypes.number.isRequired,
        bad_percentage: PropTypes.number.isRequired
    }).isRequired
};

export default PieChart2;
