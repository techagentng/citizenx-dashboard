import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts }) => {
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    // Define a color palette for the slices
    const colorPalette = [
        'rgba(255, 99, 132, 0.8)',  // Red
        'rgba(54, 162, 235, 0.8)',  // Blue
        'rgba(255, 206, 86, 0.8)',  // Yellow
        'rgba(75, 192, 192, 0.8)',  // Green
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)',  // Orange
        'rgba(199, 199, 199, 0.8)', // Gray
    ];

    // Generate colors based on the reportTypes array
    const backgroundColors = reportTypes.map((_, index) => colorPalette[index % colorPalette.length]);

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                data: reportCounts,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(255, 255, 255, 1)', // White border for clarity
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}`;
                    }
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            arc: {
                borderWidth: 1,
                borderColor: '#fff'
            }
        },
        cutout: '50%' // Adjust this for donut-style spacing
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
