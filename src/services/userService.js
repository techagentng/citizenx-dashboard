import axios from 'axios';

export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/logout`)
            .then((response) => {
                if (response) {
                    resolve(response.data);
                } else {
                    reject(response.data.error);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
