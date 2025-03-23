import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, IconButton } from '@mui/material';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import JWTContext from 'contexts/JWTContext';
import { useContext, useEffect } from 'react'; // Add useEffect
import google from 'assets/images/auth/google.png';
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { isLoggedIn } = useContext(JWTContext);
    const navigate = useNavigate(); // Hook for navigation

    // Redirect to dashboard if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const handleGoogleSignIn = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URL;
        const scope = 'openid email profile';
        const responseType = 'code';

        // Add state parameter to maintain redirect destination
        const state = encodeURIComponent(JSON.stringify({ redirectTo: '/dashboard' }));

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&state=${state}`;

        window.location.href = googleAuthUrl;
    };

    // Optionally, prevent rendering the login UI if redirecting
    if (isLoggedIn) return null;

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="theme-logo"></Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column' : 'column'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item xs={12} sx={{ textAlign: 'center', marginBottom: 3 }}>
                                                <IconButton
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid #ddd',
                                                        borderRadius: 2,
                                                        p: '8px 16px',
                                                        width: '100%',
                                                        maxWidth: 300,
                                                        mx: 'auto',
                                                        backgroundColor: '#fff',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5'
                                                        }
                                                    }}
                                                >
                                                    <img
                                                        src={google}
                                                        alt="Google Icon"
                                                        width={20}
                                                        height={20}
                                                        style={{ marginRight: 8, display: 'block' }}
                                                    />
                                                    <Typography
                                                        variant="button"
                                                        onClick={handleGoogleSignIn}
                                                        color="textPrimary"
                                                        sx={{ textAlign: 'center' }}
                                                    >
                                                        Sign in with Google
                                                    </Typography>
                                                </IconButton>
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
                                                Dont have an account?
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