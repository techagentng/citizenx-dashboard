import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts }) => {
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                data: reportCounts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{ width: '100%' }}>
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
