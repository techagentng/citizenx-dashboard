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

export const getRewardBalance = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .get(`${process.env.REACT_APP_API_URL}/get/user/balance`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('API response:', response); 
                if (response.status === 200) {
                    resolve(response.data.balance);
                } else {
                    reject(new Error(response.data.message || 'Failed to fetch rewards count'));
                }
            })
            .catch((error) => {
                console.error('API error:', error); // Add this line to debug
                reject(new Error(error.response?.data?.message || 'An error occurred while fetching rewards count'));
            });
    });
};