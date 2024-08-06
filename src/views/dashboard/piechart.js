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
                    'rgb(255, 99, 132)', // Red
                    'rgb(54, 162, 235)', // Blue
                    'rgb(255, 206, 86)', // Yellow
                    'rgb(75, 192, 192)', // Teal
                    'rgb(153, 102, 255)', // Purple
                    'rgb(255, 159, 64)', // Orange
                    'rgb(199, 199, 199)', // Grey
                    'rgb(83, 102, 128)', // Dark Blue
                    'rgb(100, 200, 100)', // Light Green
                    'rgb(255, 140, 0)' // Dark Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(54, 162, 235, 1)', // Blue
                    'rgba(255, 206, 86, 1)', // Yellow
                    'rgba(75, 192, 192, 1)', // Teal
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(199, 199, 199, 1)', // Grey
                    'rgba(83, 102, 128, 1)', // Dark Blue
                    'rgba(100, 200, 100, 1)', // Light Green
                    'rgba(255, 140, 0, 1)' // Dark Orange
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            arc: {
                borderWidth: 1, // Controls the spacing between slices
                borderColor: '#fff' // Controls the border color between slices
            }
        },
        cutout: '50%' // Adjust this to simulate spacing; set to a smaller value to create space
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
