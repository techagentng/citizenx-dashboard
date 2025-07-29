import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { setState, setLga } from 'store/slices/graphs';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ reportTypes, reportCounts, currentState }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lgaState: { lga } } = useSelector((state) => state.graphs);

    if (!reportTypes || !reportCounts || reportTypes.length === 0 || reportCounts.length === 0) {
        return <p>No data available</p>;
    }

    const handleClick = (event, elements, chart) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const reportType = chart.data.labels[clickedIndex];
            const reportCount = chart.data.datasets[0].data[clickedIndex];

            // Update Redux store
            dispatch(setState(currentState));  
            dispatch(setLga(lga));     

            // Navigate to details page with state
            navigate('/dashboard/sub_reports', { 
                state: { 
                    reportType,       
                    state: currentState, 
                    lga: lga,  
                    count: reportCount 
                } 
            });
        }
    };

    const data = {
        labels: reportTypes,
        datasets: [{
            data: reportCounts,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(199, 199, 199)',
                'rgb(83, 102, 44)',
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        onClick: (event, elements, chart) => handleClick(event, elements, chart),
    };

    return (
        <div style={{ width: '60%' }}>
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;