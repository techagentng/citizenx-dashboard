import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isLoggedIn, isInitialized } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('AuthGuard: Checking if user is logged in:', isLoggedIn, 'and initialized:', isInitialized);
        if (isInitialized && !isLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, isInitialized, navigate]);

    if (!isInitialized) {
        return <div>Loading...</div>; // or your Loader component
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
