// stateservice.js
import axios from 'axios';

export const createState = (payload) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        const formData = new FormData();

        // Add basic text fields
        if (payload.state) formData.append('state', payload.state);
        if (payload.governor) formData.append('governor', payload.governor);
        if (payload.deputyName) formData.append('deputy_name', payload.deputyName);
        if (payload.lgac) formData.append('lgac', payload.lgac);

        // ✅ Correct way to send multiple lgas for backend to parse []string
        if (payload.lgas && Array.isArray(payload.lgas)) {
            payload.lgas.forEach((lga) => {
                formData.append('lgas', lga);
            });
        }

        // Add image files
        if (payload.governorImage) formData.append('governor_image', payload.governorImage);
        if (payload.deputyImage) formData.append('deputy_image', payload.deputyImage);
        if (payload.lgacImage) formData.append('lgac_image', payload.lgacImage);

        axios
            .post(`${process.env.REACT_APP_API_URL}/create/governor`, formData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    reject(new Error(`API error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`));
                } else if (error.request) {
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    reject(error);
                }
            });
    });
};
