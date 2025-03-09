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
                lga: 'LGA Name',
                count: clickedPieData
            };

            navigate('/dashboard/sub_reports', { state: selectedData });
        }
    };

    const data = {
        labels: reportTypes,
        datasets: [
            {
                data: reportCounts,
                backgroundColor: [
                    'rgb(16,72,51)'
                    // Add more colors as needed
                ]
            }
        ]
    };

    const options = {
        onClick: handleClick
    };

    return (
        <div style={{ width: '100%' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
