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
                const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                    code,
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
                    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
                    grant_type: 'authorization_code'
                });

                const { id_token } = tokenResponse.data;
                const user = jwtDecode(id_token);
                const userEmail = user.email;

                await googleLogin(userEmail, navigate); // Pass navigate to googleLogin
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