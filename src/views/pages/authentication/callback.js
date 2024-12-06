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
            // Make an API call to the backend to exchange the code for a JWT token
            axios
                .post('https://citizenx-9hk2.onrender.com/api/v1/auth/google/callback', { code, state })
                .then((response) => {
                    const { token, user } = response.data;

                    // Store the JWT token in localStorage
                    localStorage.setItem('serviceToken', token);

                    // Optionally, store user data in localStorage
                    localStorage.setItem('user', JSON.stringify(user));

                    // Redirect the user to the home page (or any protected page)
                    navigate('/dashboard'); // Or wherever you want to redirect
                })
                .catch((error) => {
                    console.error('Error during Google login:', error);
                    // Handle error (e.g., show a message)
                });
        } else {
            console.error('State mismatch or missing code');
            // Handle error (e.g., show a message)
        }
    }, []);

    return <div>Loading...</div>; // Or a loading spinner
};

export default GoogleCallback;