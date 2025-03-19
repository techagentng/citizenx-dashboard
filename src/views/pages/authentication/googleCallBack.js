import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { LOGIN } from 'store/actions';
import { CircularProgress, Box, Typography } from '@mui/material';

const verifyToken = (token) => {
    if (!token) {
        console.error('Token is null or undefined.');
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            console.error('Token is expired.');
            return null;
        }
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error.message);
        return null;
    }
};

const setSession = (serviceToken, role_name = '') => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = serviceToken; // Already Bearer-prefixed
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }

    if (role_name) {
        localStorage.setItem('role_name', role_name);
    } else {
        localStorage.removeItem('role_name');
    }
};

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                // Exchange code for tokens
                const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                    code,
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GOOGLE_SECRET,
                    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
                    grant_type: 'authorization_code'
                });

                const { id_token } = tokenResponse.data;
                const verifiedToken = verifyToken(id_token);

                if (!verifiedToken) {
                    console.error('Invalid or expired token.');
                    setIsLoading(false);
                    navigate('/simple', { state: { error: 'Invalid token' } });
                    return;
                }

                const user = jwtDecode(id_token); 
                const userEmail = user.email;

                // Verify user with your backend and get custom token
                const loginResponse = await axios.post('https://nailsavvy.vercel.app/auth/google-login', {
                    email: userEmail
                });
                const { token, authuser } = loginResponse.data;
                const role_name = authuser.userType.name
                // Set session synchronously
                setSession(`Bearer ${token}`, user.userType.name);
                localStorage.setItem('user_info', JSON.stringify(authuser));

                // Dispatch LOGIN action to Redux store
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        role_name,
                        user,
                        isInitialized: true
                    }
                });

                // Determine redirect path
                let redirectTo = '/dashboard';
                if (state) {
                    try {
                        const parsedState = JSON.parse(decodeURIComponent(state));
                        redirectTo = parsedState.redirectTo || '/dashboard';
                    } catch (e) {
                        console.error('Error parsing state:', e);
                    }
                }

                // Navigate after dispatch
                navigate(redirectTo, { replace: true });
            } catch (error) {
                console.error('Authentication error:', error.response?.data || error.message);
                navigate('/simple', { state: { error: 'Authentication failed', details: error.response?.data } });
            } finally {
                setIsLoading(false);
            }
        };

        handleGoogleCallback();
    }, [navigate, dispatch]); // Removed isLoading from dependencies

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