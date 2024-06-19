import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
// import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

// const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// const verifyToken = (serviceToken) => {
//     if (!serviceToken) {
//         return false;
//     }
//     const decoded = jwtDecode(serviceToken);
//     /**
//      * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
//      */
//     return decoded.exp > Date.now() / 1000;
// };

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
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
                if (serviceToken) {
                    setSession(serviceToken);
                    const response = await axios.get('/me');
                    const isOnLine = await axios.get('/user/is_online');

                    const { valid } = isOnLine.data;
                    const { data } = response.data;
                    localStorage.setItem('user', JSON.stringify(data));
                    localStorage.setItem('online', JSON.stringify(valid));

                    dispatch({
                        type: LOGIN,
                        payload: { user: data }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, [dispatch]);

    const login = async (email, password) => {
        const response = await axios.post('/auth/login', { email, password });
        const { access_token, data } = response.data.data;
        setSession(access_token);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                data
            }
        });
        return response;
    };

    // const loginWithGoogle = async () => {
    //     try {
    //         const response = await axios.get('/google/login');

    //         if (response.status === 200) {
    //             const accessToken = response.data.data.access_token; // Assuming access token is in response.data.data
    //             setSession(accessToken);

    //             // Fetch user info if needed
    //             const userResponse = await axios.get('/me');
    //             const { data } = userResponse.data;

    //             dispatch({
    //                 type: LOGIN,
    //                 payload: {
    //                     isLoggedIn: true,
    //                     user: data
    //                 }
    //             });

    //             window.location.href = `/dashboard?access_token=${accessToken}`;
    //         } else {
    //             console.error('Login error:', response.data.message || 'Unknown error');
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //     }
    // };

    const register = async (fullName, userName, telephone, email, password) => {
        try {
            const response = await axios.post('/auth/signup', {
                fullName,
                userName,
                telephone,
                email,
                password
            });
            console.log('Registration response:', response);

            let user = response.data.data;

            if (window.localStorage.getItem('users')) {
                let storedUsers = JSON.parse(window.localStorage.getItem('users'));
                storedUsers.push(user);
                window.localStorage.setItem('users', JSON.stringify(storedUsers));
            } else {
                window.localStorage.setItem('users', JSON.stringify([user]));
            }

            return response; // Return the entire response
        } catch (error) {
            console.error('Registration error:', error);
            throw error; // Throw the error to be caught by the caller
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
