import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const BarChart = ({ reportTypes, reportCounts }) => {
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: reportCounts
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
