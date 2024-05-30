import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    try {
        const decoded = jwtDecode(serviceToken);
        return decoded.exp > Date.now() / 1000;
    } catch (error) {
        console.error('Token verification error:', error);
        return false;
    }
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
        console.log('Token set in Local Storage:', localStorage.getItem('serviceToken')); // Log the token after setting it
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                console.log('Service Token from Local Storage on Init:', serviceToken);
                if (serviceToken && verifyToken(serviceToken)) {
                    console.log('Token is valid.');
                    setSession(serviceToken);
                    const response = await axios.get('/me');
                    const { data } = response.data;
                    console.log('API response:', data.name);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            data
                        }
                    });
                    console.log('User is logged in and state is set.');
                } else {
                    console.log('Token is invalid or missing. Logging out.');
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error('Initialization error:', err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/auth/login', { email, password });
        const { access_token, refresh_token, user } = response.data;
        setSession(access_token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
        localStorage.setItem('refreshToken', refresh_token);
        console.log('Service Token in Local Storage:', localStorage.getItem('serviceToken')); // Verify storage
    };

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/auth/signup', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
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

    const resetPassword = async (email) => {
        console.log(email);
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
