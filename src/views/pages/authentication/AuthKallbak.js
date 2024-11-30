import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');

            if (!code) {
                console.error('Authorization code not found in URL.');
                alert('Login failed. Please try again.');
                navigate('/login'); // Redirect back to login if no code is present
                return;
            }

            try {
                const response = await fetch('https://citizenx-9hk2.onrender.com/api/v1/auth/google/callback', {
                    method: 'POST',
                    body: JSON.stringify({ code }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Failed to exchange code: ${response.statusText}`);
                }

                const data = await response.json();

                if (data && data.access_token) {
                    // Store the access token in local storage
                    localStorage.setItem('serviceToken', data.access_token);

                    // Set the authorization header for future requests
                    axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

                    // Navigate to the dashboard
                    navigate('/dashboard');
                } else {
                    throw new Error('No access token returned from backend');
                }
            } catch (error) {
                console.error('Token exchange failed:', error.message || error);
                alert('Authentication failed. Please try again.');
                navigate('/login');
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return <div>Processing Google login...</div>;
};

export default AuthCallback;
