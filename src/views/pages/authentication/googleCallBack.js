import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import JWTContext from 'contexts/JWTContext';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { LOGIN } from 'store/actions'; // Import LOGIN action

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize Redux dispatch
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
                    console.error('Invalid or expired Google token.');
                    setIsLoading(false);
                    navigate('/simple', { state: { error: 'Invalid Google token' } });
                    return;
                }

                const user = jwtDecode(id_token);
                const userEmail = user.email;

                const loginResponse = await axios.post(`${process.env.REACT_APP_API_URL}/google/user/login`, {
                    email: userEmail
                });

                const { access_token, role_name } = loginResponse.data.data;
                const verifiedBackendToken = verifyToken(access_token);
                if (!verifiedBackendToken) {
                    console.error('Invalid or expired backend token.');
                    setIsLoading(false);
                    navigate('/simple', { state: { error: 'Invalid backend token' } });
                    return;
                }

                setSession(access_token, role_name);
                localStorage.setItem('user', JSON.stringify(loginResponse.data.data));

                // ✅ Dispatch LOGIN action to update Redux state
                dispatch({
                    type: LOGIN,
                    payload: { user: loginResponse.data.data, role_name }
                });

                await googleLogin(null, null, navigate, { token: access_token, user: loginResponse.data.data, role_name });

                setTimeout(() => {
                    if (store.getState().account.isLoggedIn) {
                        navigate('/dashboard');
                    }
                }, 500);

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
