import axios from 'axios';

export const createGovernor = (payload) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/create/governor`, payload, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                    // Let axios set the Content-Type automatically
                }
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
