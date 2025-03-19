import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const StateBarChart = ({ stateReportData }) => {
    const navigate = useNavigate();

    if (!stateReportData || stateReportData.length === 0) {
        return <p>No data available</p>;
    }

    // Extracting state names and report counts
    const stateNames = stateReportData.map((state) => state.state_name);
    const reportCounts = stateReportData.map((state) => state.report_count);

    const data = {
        labels: stateNames,
        datasets: [
            {
                label: 'Report Counts',
                backgroundColor: [
                    'rgb(255, 99, 132)', // Red-pink
                    'rgb(54, 162, 235)', // Blue
                    'rgb(255, 205, 86)', // Yellow
                    'rgb(75, 192, 192)', // Teal
                    'rgb(153, 102, 255)', // Purple
                    'rgb(255, 159, 64)', // Orange
                    'rgb(199, 199, 199)', // Grey
                    'rgb(83, 102, 44)' // Olive
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
                data: reportCounts
            }
        ]
    };

    // Placeholder click handler
    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const stateIndex = elements[0].index;
            const selectedState = stateNames[stateIndex];
            navigate(`/state/${selectedState}`); // Navigate to state details page
        }
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        onClick: handleClick // Fixed onClick reference
    };

    return (
        <div style={{ width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default StateBarChart;
