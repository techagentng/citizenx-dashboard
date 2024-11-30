import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import JWTContext from 'contexts/JWTContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { loginWithGoogle } = useContext(JWTContext);

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const code = searchParams.get('code');
console.log("zzzzzzz", code)
            if (!code) {
                console.error('Authorization code not found in URL.');
                alert('Login failed. Please try again.');
                navigate('/login'); // Redirect to login if no code is found
                return;
            }

            try {
                // Assuming loginWithGoogle handles token retrieval and storage
                console.log("xxxxxxx", code)
                const success = await loginWithGoogle(code);

                if (success) {
                    navigate('/dashboard'); // Redirect to dashboard on success
                } else {
                    throw new Error('Login with Google failed.');
                }
            } catch (error) {
                console.error('Google login failed:', error.message || error);
                alert('Authentication failed. Please try again.');
                navigate('/login'); // Redirect to login on failure
            }
        };

        handleGoogleAuth();
    }, [searchParams, navigate, loginWithGoogle]);

    return <div>Processing Google login...</div>;
};

export default AuthCallback;
