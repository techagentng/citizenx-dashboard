import axios from 'axios';

export const createState = (payload) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');
        if (!serviceToken) {
            return reject(new Error('No authentication token found'));
        }

        // Create FormData object for multipart/form-data
        const formData = new FormData();

        // Add text fields from payload
        if (payload.state) formData.append('state', payload.state);
        if (payload.governor) formData.append('governor', payload.governor);
        if (payload.deputyName) formData.append('deputy_name', payload.deputyName);
        if (payload.lgac) formData.append('lgac', payload.lgac);
        if (payload.lgas) {
            // Send LGAs as a JSON string (backend supports JSON or comma-separated)
            formData.append('lgas', JSON.stringify(payload.lgas));
        }

        // Add file fields from payload (assuming they're File objects)
        if (payload.governorImage) formData.append('governor_image', payload.governorImage);
        if (payload.deputyImage) formData.append('deputy_image', payload.deputyImage);
        if (payload.lgacImage) formData.append('lgac_image', payload.lgacImage);

        axios
            .post(`${process.env.REACT_APP_API_URL}/states`, formData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
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

// Example usage:
const payload = {
    state: 'Test State',
    governor: 'Test Governor',
    deputyName: 'Test Deputy',
    lgac: 'Test LGAC',
    lgas: ['LGA1', 'LGA2', 'LGA3'],
    governorImage: fileInput.files[0], 
    deputyImage: fileInput2.files[0],
    lgacImage: fileInput3.files[0],
};

createState(payload)
    .then((response) => console.log('Success:', response))
    .catch((error) => console.error('Error:', error.message));