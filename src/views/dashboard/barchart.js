import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const BarChart = ({ reportTypes, reportCounts }) => {
    const navigate = useNavigate();
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const clickedBarData = data.datasets[0].data[clickedIndex];
            const reportType = data.labels[clickedIndex];

            // Example LGA and count data to pass along
            const selectedData = {
                state: reportType,
                lga: "LGA Name",  
                count: clickedBarData
            };

            // Navigate to another page with the selected data
            navigate('/dashboard/sub_reports', { state: selectedData });
        }
    };

    const data = {
        labels: reportTypes,
        datasets: [
            {
                label: 'Report Counts',
                backgroundColor: 'rgb(16,72,51)',
                borderColor: 'rgb(16,72,51)',
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
        },
        onClick: handleClick,
    };

    return (
        <div style={{ width: '100%' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
