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

export const deleteReport = (id) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .delete(`${process.env.REACT_APP_API_URL}/incident-report/${id}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data); // Assuming response.data contains a success message or relevant data
                } else {
                    reject(new Error('Failed to delete report'));
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(new Error(error.response.data.error || 'An error occurred'));
                } else if (error.request) {
                    reject(new Error('Request failed, no response received'));
                } else {
                    reject(new Error('An error occurred while processing the request'));
                }
            });
    });
};

export const getStateReportCounts = (criteria) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/report-type/states`, criteria, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data); // Assuming response.data contains the report counts
                } else {
                    reject(new Error('Failed to fetch report counts'));
                }
            })
            .catch((error) => {
                if (error.response) {
                    reject(new Error(error.response.data.error || 'An error occurred'));
                } else if (error.request) {
                    reject(new Error('Request failed, no response received'));
                } else {
                    reject(new Error('An error occurred while processing the request'));
                }
            });
    });
};

export const getBarChartData = (requestBody) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/report-type/states`, requestBody, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data); // Changed this line to resolve response.data
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/category`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data.categories);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const getStates = () => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/states`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data.states);
                } else {
                    reject(new Error('No data found'));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
