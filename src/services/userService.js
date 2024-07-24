import axios from 'axios';

export const getAllUserCount = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/all/user`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response) {
                    resolve(response.data.total_users);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getAllReportsToday = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/today/report`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response) {
                    resolve(response.data.data);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getOnlineUsers = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        console.log('getOnlineUsers called'); // Log when function is called
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/online`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('API response:', response.data); // Log the entire response data
                if (response) {
                    resolve(response.data.data); // Extract the count from the data property
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                console.log('API error:', error); // Log any errors
                reject(error);
            });
    });
};

export const uploadProfileImage = (file) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        const formData = new FormData();
        formData.append('file', file);

        axios
            .post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('API response:', response.data);
                if (response.data.status === 'OK') {
                    resolve(response.data.message); 
                } else {
                    reject(new Error('File upload failed'));
                }
            })
            .catch((error) => {
                console.log('API error:', error); 
                reject(error);
            });
    });
};

export const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        // Assuming formData is an empty FormData object or contains necessary data
        const formData = new FormData();

        axios
            .post(`${process.env.REACT_APP_API_URL}/users/all`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                console.log('API response:', response.data); // Log the entire response data
                if (response.data.status === 'OK') {
                    resolve(response.data.users); // Adjust based on actual data structure
                } else {
                    reject(new Error(response.data.message || 'Failed to fetch users'));
                }
            })
            .catch((error) => {
                console.log('API error:', error); // Log any errors
                reject(new Error(error.response?.data?.message || 'An error occurred while fetching users'));
            });
    });
};
