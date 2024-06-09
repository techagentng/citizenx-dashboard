import axios from 'axios';

export const getAllRewardCount = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .get(`${process.env.REACT_APP_API_URL}/count/all/rewards`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.total_balance);
                } else {
                    reject(new Error(response.data.message || 'Failed to fetch rewards count'));
                }
            })
            .catch((error) => {
                console.log('API error:', error); // Log any errors
                reject(new Error(error.response?.data?.message || 'An error occurred while fetching rewards count'));
            });
    });
};
