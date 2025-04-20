import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const StateBarChart = ({ data }) => { // Rename prop to "data" for clarity
    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    const reportTypes = data.map((item) => item.report_type);
    const counts = data.map((item) => item.count);

    const chartData = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(199, 199, 199)',
                    'rgb(83, 102, 44)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(199, 199, 199)',
                    'rgb(83, 102, 44)'
                ],
                borderWidth: 1,
                data: counts
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
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default StateBarChart;