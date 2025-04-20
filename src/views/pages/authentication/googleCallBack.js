import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import JWTContext from 'contexts/JWTContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { googleLogin } = useContext(JWTContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (!code) {
                console.error('Authorization code not found.');
                navigate('/login', { state: { error: 'No authorization code' } });
                return;
            }

            try {
                // Step 1: Exchange code for tokens
                const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                    code,
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
                    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
                    grant_type: 'authorization_code'
                });

                const { id_token, access_token } = tokenResponse.data;

                // Step 2: Decode ID token to get email and name
                const user = jwtDecode(id_token);
                const userEmail = user.email;
                const userName = user.name || 'Google User'; // Fallback if name isn’t provided

                // Step 3: Fetch phone number using People API (requires access_token)
                let userPhone = '';
                try {
                    const peopleResponse = await axios.get('https://people.googleapis.com/v1/people/me?personFields=phoneNumbers', {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    });
                    userPhone = peopleResponse.data.phoneNumbers?.[0]?.value || '';
                } catch (phoneError) {
                    console.warn('Failed to fetch phone number:', phoneError.response?.data || phoneError.message);
                    // Proceed without phone number if unavailable
                }

                // Step 4: Call googleLogin with email, name, and phone
                await googleLogin(userEmail, userName, userPhone, navigate);
            } catch (error) {
                console.error('Authentication error:', error.response?.data || error.message);
                navigate('/login', { state: { error: 'Authentication failed', details: error.response?.data } });
            } finally {
                setIsLoading(false);
            }
        };

        handleGoogleCallback();
    }, [navigate, googleLogin]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Authenticating...
                    </Typography>
                </Box>
            </Box>
        );
    }

    return null;
};

export default GoogleCallback;
