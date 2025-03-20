import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import JWTContext from 'contexts/JWTContext';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { LOGIN } from 'store/actions';
import { setSession } from 'contexts/JWTContext';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { googleLogin } = useContext(JWTContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get('code');
            const state = queryParams.get('state');

            if (!code) {
                console.error('Authorization code not found.');
                setIsLoading(false);
                navigate('/simple', { state: { error: 'No authorization code' } });
                return;
            }

            try {
                // Exchange authorization code for access token
                const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                    code,
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
                    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
                    grant_type: 'authorization_code'
                });

                const { id_token } = tokenResponse.data;
                if (!id_token) {
                    throw new Error('Failed to retrieve Google ID token.');
                }

                const user = jwtDecode(id_token);
                const userEmail = user.email;

                // Send the Google ID token to backend for login
                const loginResponse = await axios.post(`${process.env.REACT_APP_API_URL}/google/user/login`, {
                    email: userEmail
                });

                const { access_token, role_name, user: userData } = loginResponse.data.data;
                if (!access_token) {
                    throw new Error('Backend authentication failed.');
                }

                // Store token and session
                await setSession(access_token, role_name);
                dispatch({
                    type: LOGIN,
                    payload: { user: userData, role_name }
                });
                await googleLogin(null, null, navigate, {
                    token: access_token,
                    user: userData,
                    role_name
                });

                // Determine redirect location
                let redirectTo = '/dashboard';
                if (state) {
                    try {
                        const parsedState = JSON.parse(decodeURIComponent(state));
                        redirectTo = parsedState.redirectTo || '/dashboard';
                    } catch (e) {
                        console.error('Error parsing state:', e);
                    }
                }

                navigate(redirectTo, { replace: true });
            } catch (error) {
                console.error('Authentication error:', error.response?.data || error.message);
                navigate('/simple', { state: { error: 'Authentication failed', details: error.response?.data } });
            } finally {
                setIsLoading(false);
            }
        };

        handleGoogleCallback();
    }, [navigate, googleLogin, dispatch]);

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
