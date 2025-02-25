import axios from 'axios';

export const createGovernor = (payload) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem("serviceToken");
        if (!serviceToken) {
            return reject(new Error("No token found"));
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/create/governor`, payload, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};