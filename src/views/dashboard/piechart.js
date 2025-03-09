import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts }) => {
    const navigate = useNavigate();
    
    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const clickedPieData = data.datasets[0].data[clickedIndex];
            const reportType = data.labels[clickedIndex];

            const selectedData = {
                state: reportType,
                lga: "LGA Name",
                count: clickedPieData
            };

            navigate('/dashboard/sub_reports', { state: selectedData });
        }
    };

    const data = {
        labels: reportTypes,
        datasets: [{
            data: reportCounts,
            backgroundColor: [
                'rgb(255, 99, 132)',    // Red-pink
                'rgb(54, 162, 235)',    // Blue
                'rgb(255, 205, 86)',    // Yellow
                'rgb(75, 192, 192)',    // Teal
                'rgb(153, 102, 255)',   // Purple
                'rgb(255, 159, 64)',    // Orange
                'rgb(199, 199, 199)',   // Grey
                'rgb(83, 102, 44)',     // Olive
            ],
            hoverOffset: 4          // Adds a nice hover effect
        }]
    };

    const options = {
        onClick: handleClick,
    };

    return (
        <div style={{ width: '60%' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;