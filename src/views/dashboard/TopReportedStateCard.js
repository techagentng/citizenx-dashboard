import React, { useEffect, useState } from 'react';
import PopularCard from './PopularCard'; // Adjust path if needed
// import BajajAreaChartCard from './BajajAreaChartCard'; // Ensure correct path
import { getStateReportCountsAllx } from 'services/reportService'; 

const TopReportedStatesCard = () => {
    const [formattedTopStates, setFormattedTopStates] = useState([]);
    const [, setTotalStateReports] = useState(0);
    const [totalReportCountArray, setTotalReportCountArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getStateReportCountsAllx();

                const validStates = response?.filter(item => item.state_name && item.report_count !== undefined);

                const formatted = validStates.map((item) => ({
                    stateName: item.state_name,
                    reportCount: item.report_count
                }));

                const countArray = validStates.map(item => item.report_count);

                setFormattedTopStates(formatted);
                setTotalReportCountArray(countArray);
                setTotalStateReports(validStates.length); // Total number of reported states
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching state report counts:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>            
            {/* List section using PopularCard */}
            <PopularCard
                title="Top Reported States in Nigeria"
                data={formattedTopStates}
                totalReportCount={totalReportCountArray}
                type="states"
                isLoading={isLoading}
            />
        </>
    );
};

export default TopReportedStatesCard;
