import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'utils/axios';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            if (code) {
                try {
                    const response = await axios.post('/api/v1/google/login', { code });
                    const { access_token } = response.data.data;

                    localStorage.setItem('serviceToken', access_token);
                    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

                    navigate('/dashboard');
                } catch (error) {
                    console.error('Google login failed:', error);
                }
            }
        };

        handleCallback();
    }, [navigate, searchParams]);

    return <div>Processing Google login...</div>;
};

export default AuthCallback;
