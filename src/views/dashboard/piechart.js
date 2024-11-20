import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts }) => {
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    // Predefined pool of distinct colors
    const colorPool = [
        'rgb(100, 200, 100)', // Green
        'rgb(255, 99, 132)',  // Red
        'rgb(54, 162, 235)',  // Blue
        'rgb(255, 206, 86)',  // Yellow
        'rgb(75, 192, 192)',  // Teal
        'rgb(153, 102, 255)', // Purple
        'rgb(255, 159, 64)'   // Orange
    ];

    // Dynamically assign colors from the pool without duplication
    const assignedColors = reportTypes.map((type, index) => {
        if (type.toLowerCase().includes('good')) return 'rgb(100, 200, 100)'; // Green for Good
        if (type.toLowerCase().includes('bad')) return 'rgb(255, 99, 132)';   // Red for Bad
        return colorPool[index % colorPool.length]; // Cycle through colorPool
    });

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                data: reportCounts,
                backgroundColor: assignedColors,
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
