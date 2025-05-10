// stateservice.js
import axios from 'axios';

export const createState = (payload) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        const formData = new FormData();

        // Basic fields
        if (payload.state) formData.append('state', payload.state);
        if (payload.governor) formData.append('governor', payload.governor);
        if (payload.deputyName) formData.append('deputy_name', payload.deputyName);
        if (payload.lgac) formData.append('lgac', payload.lgac);

        // List of LGAs (must match form:"lgas" in Go backend)
        if (Array.isArray(payload.lgas)) {
            payload.lgas.forEach((lga) => {
                if (lga) formData.append('lgas', lga); // skip null/undefined
            });
        }

        // File uploads
        if (payload.governorImage instanceof File) {
            formData.append('governor_image', payload.governorImage);
        }

        if (payload.deputyImage instanceof File) {
            formData.append('deputy_image', payload.deputyImage);
        }

        if (payload.lgacImage instanceof File) {
            formData.append('lgac_image', payload.lgacImage);
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/create/governor`, formData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => resolve(response.data))
            .catch((error) => {
                if (error.response) {
                    reject(new Error(
                        `API error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`
                    ));
                } else if (error.request) {
                    reject(new Error('Network error: Unable to reach the server'));
                } else {
                    reject(error);
                }
            });
    });
};

