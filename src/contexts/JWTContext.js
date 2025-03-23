import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';
import { jwtDecode } from 'jwt-decode';
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

export const setSession = (serviceToken, role_name = '') => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        localStorage.setItem('role_name', role_name);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('role_name');
        delete axios.defaults.headers.common.Authorization;
    }
    // Removed artificial delay; localStorage is synchronous
};

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    role_name: ''
};

export const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = localStorage.getItem('serviceToken');
                const serviceRole = localStorage.getItem('role_name');

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
                    setSession(null);
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
            if (navigate) {
                navigate('/dashboard', { replace: true }); // Ensure navigation happens after state update
            }
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const googleLogin = async (email, fullname, telephone, navigate) => {
        try {
            // Send email, fullname, and telephone to the backend
            const response = await axios.post('/google/user/login', {
                email,
                fullname,
                telephone
            });
    
            // Extract data from the response
            const { access_token, role_name, ...data } = response.data.data;
            const roleName = role_name || 'User'; // Fallback role name
    
            // Update session and state
            setSession(access_token, roleName);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: {
                        ...data, // Spread the user data (id, fullname, username, telephone, email, etc.)
                        email // Ensure email is included if not in data
                    },
                    role_name: roleName,
                    isInitialized: true
                }
            });
    
            // Navigate to dashboard if provided
            if (navigate) {
                navigate('/dashboard', { replace: true });
            }
    
            return response;
        } catch (error) {
            console.error('Google Login error:', error.response?.data || error.message);
            throw error;
        }
    };
    
    const facebookLogin = async (email, fullname, telephone, navigate) => {
        try {
            // Send email, fullname, and telephone to the backend
            const response = await axios.post('/facebook/user/login', {
                email,
                fullname,
                telephone
            });

            // Extract data from the response
            const { access_token, role_name, ...data } = response.data.data;
            const roleName = role_name || 'User'; // Fallback role name

            // Update session and state
            setSession(access_token, roleName);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: {
                        ...data, // Spread the user data (id, fullname, username, telephone, email, etc.)
                        email // Ensure email is included if not in data
                    },
                    role_name: roleName,
                    isInitialized: true
                }
            });

            // Navigate to dashboard if provided
            if (navigate) {
                navigate('/dashboard', { replace: true });
            }

            return response;
        } catch (error) {
            console.error('Facebook Login error:', error.response?.data || error.message);
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

            let storedUsers = localStorage.getItem('users');
            storedUsers = storedUsers ? JSON.parse(storedUsers) : [];
            storedUsers.push(user);
            localStorage.setItem('users', JSON.stringify(storedUsers));

            dispatch({
                type: LOGIN, // Changed to LOGIN for consistency (assuming registration logs in)
                payload: {
                    user,
                    role_name,
                    isLoggedIn: true,
                    isInitialized: true
                }
            });

            if (navigate) {
                navigate('/dashboard', { replace: true }); // Redirect to dashboard instead of login
            }
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async (navigate) => {
        try {
            await axios.get('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }
        setSession(null);
        dispatch({
            type: LOGOUT,
            payload: { isInitialized: true }
        });
        if (navigate) {
            navigate('/login', { replace: true });
        }
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
        <JWTContext.Provider value={{ ...state, login, logout, register, forgotPassword, updateProfile, googleLogin, facebookLogin }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;