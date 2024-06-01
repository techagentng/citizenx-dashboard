import axios from 'axios';

export const getTodayReportCount = () => {
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
