// New service to fetch actual incident reports
import axios from 'axios';

export const getIncidentReportsByCategory = (category, state) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No token found'));
        }

        const params = { category };
        if (state) {
            params.state_name = state;
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/report/incident_reports`, {
                params,
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            })
            .then((response) => {
                if (response && response.data && Array.isArray(response.data.data)) {
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
