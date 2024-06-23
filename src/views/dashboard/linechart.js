import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, LineController);

const LineChart = ({ reportTypes, reportCounts }) => {
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: reportCounts,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
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
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
