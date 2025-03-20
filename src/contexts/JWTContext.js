import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
// Reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { jwtDecode } from 'jwt-decode';
// Project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const verifyToken = (serviceToken) => {
    if (!serviceToken) return false;
    try {
        const decoded = jwtDecode(serviceToken);
        return decoded.exp > Date.now() / 1000;
    } catch (err) {
        return false;
    }
};
// Initial state
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    role_name: ''
};

export const setSession = async (serviceToken, role_name = '') => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        localStorage.setItem('role_name', role_name);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('role_name');
        delete axios.defaults.headers.common.Authorization;
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100); // Small delay to ensure storage updates before proceeding
    });
};


// Create context
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                const serviceRole = window.localStorage.getItem('role_name');

                if (serviceToken && serviceRole && verifyToken(serviceToken)) {
                    setSession(serviceToken, serviceRole);

                    const response = await axios.get('/me');
                    const isOnLine = await axios.get('/user/is_online');
                    const { valid } = isOnLine.data;
                    const { data } = response.data;

                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage.setItem('online', JSON.stringify(valid));

                    dispatch({
                        type: LOGIN,
                        payload: {
                            user: data,
                            role_name: serviceRole || data.role_name,
                            isLoggedIn: true,
                            isInitialized: true
                        }
                    });
                } else {
                    console.warn('Token or role missing or invalid');
                    setSession(null); // Clear invalid session
                    dispatch({ type: LOGOUT, payload: { isInitialized: true } });
                }
            } catch (err) {
                console.error('Error during initialization:', err);
                setSession(null);
                dispatch({ type: LOGOUT, payload: { isInitialized: true } });
            }
        };
        init();
    }, []);

    const login = async (email, password, navigate) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { access_token, role_name, ...data } = response.data.data;
            const roleName = role_name || 'User';
            setSession(access_token, role_name);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: data,
                    role_name: roleName,
                    isInitialized: true
                }
            });
            navigate('/dashboard'); // Redirect to dashboard
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const googleLogin = async (email, navigate) => {
        try {
            const response = await axios.post('/google/user/login', { email });
    
            const { access_token, role_name, ...data } = response.data.data;
            const roleName = role_name || 'User';
    
            setSession(access_token, roleName);
    
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: data,
                    role_name: roleName,
                    isInitialized: true
                }
            });
    
            navigate('/dashboard'); // Redirect to dashboard
            return response;
        } catch (error) {
            console.error('Google Login error:', error);
            throw error;
        }
    };
    
    
    const register = async (fullName, userName, telephone, email, password, profile_image, navigate) => {
        try {
            const formData = new FormData();
            if (profile_image && profile_image instanceof File) {
                formData.append('profile_image', profile_image);
            }
            formData.append('fullName', fullName);
            formData.append('userName', userName);
            formData.append('telephone', telephone);
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post('/auth/signup', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const user = response.data.data;
            const role_name = user.role_name || 'User';

            let storedUsers = window.localStorage.getItem('users');
            storedUsers = storedUsers ? JSON.parse(storedUsers) : [];
            storedUsers.push(user);
            window.localStorage.setItem('users', JSON.stringify(storedUsers));

            // Dispatch REGISTER action to update state
            dispatch({
                type: REGISTER,
                payload: {
                    user,
                    role_name
                }
            });

            navigate('/login'); // Redirect to login page after registration
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.get('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        setSession(null);
        dispatch({
            type: LOGOUT,
            payload: { isInitialized: true } // Add payload to reset state
        });
    };

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post('/password/forgot', { email });
            console.log('Forgot password response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error while resetting password:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to send password reset email.');
        }
    };

    const updateProfile = () => {};

    if (!state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, forgotPassword, updateProfile, googleLogin }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
