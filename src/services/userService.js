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

export const updateUserProfile = (userDetails) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .put(`${process.env.REACT_APP_API_URL}/me/updateUserProfile`, userDetails, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(new Error('Profile update failed'));
                }
            })
            .catch((error) => {
                console.error('API error:', error);
                reject(error);
            });
    });
};

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        axios
            .get(`${process.env.REACT_APP_API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data.data); // Return the `data` object from the response
                } else {
                    reject(new Error('Failed to retrieve user profile'));
                }
            })
            .catch((error) => {
                console.error('API error:', error);
                reject(error);
            });
    });
};

export const uploadToS3 = (file) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        // Create FormData object to send file data in the request
        const formData = new FormData();
        formData.append('profileImage', file);

        axios
            .put(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data); // The response contains message and url
                } else {
                    reject(new Error('Failed to upload file'));
                }
            })
            .catch((error) => {
                console.error('API error:', error);
                reject(error);
            });
    });
};

