import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            if (code) {
                try {
                    // Send the `code` to the backend to exchange it for an access token
                    const response = await fetch('/api/v1/auth/google/callback', {
                        method: 'POST',
                        body: JSON.stringify({ code }),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    const data = await response.json();

                    if (data && data.access_token) {
                        // Store the access token in local storage
                        localStorage.setItem('serviceToken', data.access_token);

                        // Optionally, set the authorization header for future API calls
                        axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

                        // Navigate to the dashboard or other authenticated page
                        navigate('/dashboard');
                    } else {
                        console.error('No access token returned:', data);
                    }
                } catch (error) {
                    console.error('Token exchange failed:', error);
                }
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return <div>Processing Google login...</div>;
};

export default AuthCallback;
