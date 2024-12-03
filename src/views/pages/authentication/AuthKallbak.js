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
            const state = searchParams.get('state');
            const storedState = localStorage.getItem('google_oauth_state'); // Use the correct key

            // Validate the state for CSRF protection
            if (state !== storedState) {
                console.error('State mismatch. Possible CSRF attack.');
                navigate('/login', {
                    state: { error: 'State mismatch. Possible CSRF attack.' }
                });
                return;
            }

            // Remove state from localStorage after validation
            localStorage.removeItem('state');

            if (!code) {
                console.error('Authorization code not found in URL.');
                navigate('/login', {
                    state: { error: 'Login failed. No authorization code.' }
                });
                return;
            }

            try {
                // Call your function to login and process the response
                const success = await loginWithGoogle(state, code);  // Pass both state and code

                if (success) {
                    navigate('/dashboard', { 
                        replace: true // Prevent going back to callback page
                    });
                } else {
                    throw new Error('Login with Google failed.');
                }
            } catch (error) {
                console.error('Google login failed:', error);
                navigate('/login', {
                    state: {
                        error: error.message || 'Authentication failed'
                    }
                });
            }
        };

        handleGoogleAuth();
    }, [searchParams, navigate, loginWithGoogle]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div role="status">
                    <svg 
                        aria-hidden="true" 
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" 
                        viewBox="0 0 100 101" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* SVG spinner content */}
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-4 text-gray-600">Processing Google login...</p>
            </div>
        </div>
    );
};

export default AuthCallback;
