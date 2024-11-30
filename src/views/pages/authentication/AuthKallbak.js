import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import JWTContext from 'path-to-jwt-context';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithGoogle } = useContext(JWTContext);

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const code = searchParams.get('code');

            if (!code) {
                console.error('Authorization code not found in URL.');
                alert('Login failed. Please try again.');
                navigate('/login'); // Redirect to login if no code is found
                return;
            }

            try {
                await loginWithGoogle(code, navigate);
            } catch (error) {
                console.error('Google login failed:', error);
                alert('Authentication failed. Please try again.');
                navigate('/login');
            }
        };

        handleGoogleAuth();
    }, [searchParams, navigate, loginWithGoogle]);

    return <div>Processing Google login...</div>;
};

export default AuthCallback;
