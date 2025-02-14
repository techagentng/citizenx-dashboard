import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RatingPieChart = ({ rating }) => {
    if (!rating || !rating.good_percentage || !rating.bad_percentage) {
        return <p>No data available</p>;
    }

    const data = {
        labels: ['Good', 'Bad'],
        datasets: [
            {
                labels: ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good'],
                data: [rating.good_percentage, rating.bad_percentage],
                backgroundColor: ['rgb(0,137,123)', 'rgb(16,72,51)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
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

export default RatingPieChart;
