import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JWTContext from 'contexts/JWTContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const FacebookCallback = () => {
    const navigate = useNavigate();
    const { socialLogin } = useContext(JWTContext); // Use socialLogin from updated JWTContext
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleFacebookCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');

            if (!code) {
                console.error('Authorization code not found.');
                navigate('/login', { state: { error: 'No authorization code' } });
                return;
            }

            try {
                // Step 1: Exchange code for Facebook access token
                const tokenResponse = await axios.get(
                    `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(
                        process.env.REACT_APP_FACEBOOK_REDIRECT_URL
                    )}&client_secret=${process.env.REACT_APP_FACEBOOK_SECRET}&code=${code}`
                );

                const { access_token } = tokenResponse.data;

                // Step 2: Get user email from Facebook
                const userResponse = await axios.get(
                    `https://graph.facebook.com/me?fields=email&access_token=${access_token}`
                );
                const userEmail = userResponse.data.email;

                // Step 3: Send email to server to get app token
                await socialLogin(userEmail, navigate, 'facebook'); // Pass provider type to differentiate if needed
            } catch (error) {
                console.error('Facebook authentication error:', error.response?.data || error.message);
                navigate('/login', { state: { error: 'Authentication failed', details: error.response?.data } });
            } finally {
                setIsLoading(false);
            }
        };

        handleFacebookCallback();
    }, [navigate, socialLogin]);

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

export default FacebookCallback;