import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        const state = queryParams.get('state');
        const savedState = localStorage.getItem('googleState'); // Retrieve stored state

        if (savedState === state && code) {
            // Make a GET request to the backend with the code and state as query parameters
            axios
                .get('https://citizenx-9hk2.onrender.com/api/v1/auth/google/callback', {
                    params: { code, state } // Send code and state as query parameters
                })
                .then((response) => {
                    const { token, user } = response.data;

                    // Store the JWT token in localStorage
                    localStorage.setItem('serviceToken', token);

                    // Optionally, store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Redirect the user to the dashboard
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error('Error during Google login:', error);
                    // Handle error (e.g., show a message)
                });
        } else {
            console.error('State mismatch or missing code');
            // Handle error (e.g., show a message)
        }
    }, [navigate]);

    return <div>Loading...</div>; // Or a loading spinner
};

export default GoogleCallback;
