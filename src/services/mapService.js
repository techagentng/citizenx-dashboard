import axios from 'axios';

export const getMapMarkers = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            // .get(`${process.env.REACT_APP_API_URL}/report/lga/count`, {
            .get(`${process.env.REACT_APP_API_URL}/incident-report/state/count`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('API response:::::', response.data);
                resolve(response.data.report_counts);
            })
            .catch((error) => {
                console.log('API error:', error); // Log any errors
                reject(new Error('An error occurred while fetching markers'));
            });
    });
};

export const getStateCount = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/incident-report/state/count`, {
            headers: {
                Authorization: `Bearer ${serviceToken}` // Ensure `serviceToken` is defined and accessible
            }
        });
        console.log('Response:', response);
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
