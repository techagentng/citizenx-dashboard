import axios from 'axios';

export const getMapMarkers = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .get(`${process.env.REACT_APP_API_URL}/lgas/lat/lng`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then(response => {
                console.log('API response:', response.data); // Log the entire response data
                resolve(response.data);
            })
            .catch(error => {
                console.log('API error:', error); // Log any errors
                reject(new Error('An error occurred while fetching markers'));
            });
    });
};