import axios from 'axios';

export const getMapMarkers = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .get(`${process.env.REACT_APP_API_URL}/report/lga/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then(response => {
                console.log('API response:', response.data); // Log the entire response data
                resolve(response.data.report_counts);
            })
            .catch(error => {
                console.log('API error:', error); // Log any errors
                reject(new Error('An error occurred while fetching markers'));
            });
    });
};

export const getStateCount = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/v1/incident-report/state/count');
        if (response.status === 200) {
            return response.data.data;
        } else {
            console.error('Error fetching state report counts:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error during API call:', error);
        return [];
    }
};