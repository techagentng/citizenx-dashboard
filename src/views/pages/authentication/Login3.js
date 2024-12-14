import { Link } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Button } from '@mui/material';
// import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import GoogleIcon from '@mui/icons-material/Google';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './auth-forms/AuthLogin';
// import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import JWTContext from 'contexts/JWTContext';
import { useContext } from 'react';
import axios from 'utils/axios';
// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { isLoggedIn } = useContext(JWTContext); // Added state for JWT Context
    // const { loginWithGoogle } = useContext(JWTContext);

    const handleGoogleLogin = async () => {
        try {
            // Step 1: Redirect the user to the backend to get the Google auth URL
            const response = await axios.get('/google/login');
            const authUrl = response.data.auth_url;
            window.location.href = authUrl; // Redirect to Google login page
        } catch (error) {
            console.error('Error initiating Google logingg:', error);
            // Optionally handle errors (e.g., show a message)
        }
    };

    // Step 3: Handle Redirect After Google Login
    // useEffect(() => {
    //     console.log('useEffect triggered');
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const code = queryParams.get('code');
    //     const state = queryParams.get('state');
    //     const savedState = localStorage.getItem('googleState');  // Retrieve stored state
    //     console.log('Saved state:', savedState);
    //     console.log('Received state:', state);

    //     // If code and state exist in URL, process the Google login
    //     if (savedState === state && code) {
    //         loginWithGoogle(state, code);
    //     } else {
    //         console.error('State mismatch or missing code');
    //     }
    // }, []);

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="theme-logo">
                                           
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'column'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item sx={{ mb: 3 }}>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Login to earn points
                                                    </Typography>
                                                </Stack>
                                            </Grid>

                                            <Grid item sx={{ mb: 3 }}>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<GoogleIcon />}
                                                    sx={{
                                                        borderRadius: '40px',
                                                        width: '260px',
                                                        height: '50px',
                                                        fontSize: '16px',
                                                        border: '1px solid #B0B0B0', // Thin grey outline
                                                        color: '#000', // Black text
                                                        textTransform: 'none', // Preserve capitalization
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        '&:hover': {
                                                            backgroundColor: '#F5F5F5', // Subtle hover effect
                                                            border: '1px solid #A0A0A0' // Slightly darker grey on hover
                                                        }
                                                    }}
                                                    onClick={handleGoogleLogin}
                                                >
                                                    Continue with Google
                                                </Button>
                                            </Grid>

                                            <Grid item>
                                                <Stack alignItems="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h4' : 'h3'}
                                                    >
                                                        OR
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
