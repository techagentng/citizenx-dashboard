const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    role_name: ''  // Add role_name to initial state
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user, role_name } = action.payload;
            return {
                ...state,
                user,
                role_name
            };
        }
        case LOGIN: {
            const { user, role_name } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user,
                role_name
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null,
                role_name: ''
            };
        }
        default: {
            return state;
        }
    }
};

export default accountReducer;
