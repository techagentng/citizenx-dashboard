import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
// Reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// Project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

// Initial state
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    role_name: ''
};

const setSession = (serviceToken, role_name = '') => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }

    if (role_name) {
        localStorage.setItem('role_name', role_name);
    } else {
        localStorage.removeItem('role_name');
    }
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
                if (serviceToken && serviceRole) {
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
                            role_name: data.role_name,
                            isLoggedIn: true,
                            isInitialized: true
                        }
                    });
                } else {
                    console.warn('Token or role missing from localStorage');
                    dispatch({ type: LOGOUT });
                }
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    // Handle unauthorized (e.g., token expired)
                    console.warn('Token expired or unauthorized');
                } else {
                    console.error('Error during initialization: ', err);
                }
                dispatch({ type: LOGOUT });
            }
        };

        init();
    }, [dispatch]);

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

    const loginWithGoogle = async (state, code, navigate) => {
        try {
            const response = await axios.post(
                '/auth/google/callback',
                { code },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Client-State': state
                    }
                }
            );

            const { token, user } = response.data;

            // Assuming you have a setSession function similar to your other login method
            setSession(token, user.role_name || 'User');

            // Dispatch login action to update global state
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: user,
                    role_name: user.role_name || 'User',
                    isInitialized: true
                }
            });

            // Navigate to dashboard
            navigate('/dashboard');

            return true;
        } catch (error) {
            // Handle different types of errors
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Google login error response:', error.response.data);

                // You might want to show a specific error message based on the response
                // For example:
                // toast.error(error.response.data.message || 'Google login failed');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                // toast.error('No response from server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up Google login:', error.message);
                // toast.error('An unexpected error occurred');
            }

            return false;
        }
    };

    const register = async (fullName, userName, telephone, email, password, profile_image) => {
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

            let user = response.data.data;

            let storedUsers = window.localStorage.getItem('users');
            if (storedUsers) {
                storedUsers = JSON.parse(storedUsers);
                storedUsers.push(user);
                window.localStorage.setItem('users', JSON.stringify(storedUsers));
            } else {
                window.localStorage.setItem('users', JSON.stringify([user]));
            }

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
        dispatch({ type: LOGOUT });
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
        <JWTContext.Provider value={{ ...state, login, logout, register, forgotPassword, updateProfile, loginWithGoogle }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
