import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    users: [],
    avatarUrl: '',
    role_name: ''
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },
        getUsersReviewSuccess(state, action) {
            state.users = action.payload;
        },
        setAvatarUrl(state, action) {
            state.avatarUrl = action.payload;
        },
        setRoleName(state, action) {
            state.role_name = action.payload;
        }
    }
});

export default slice.reducer;

// Actions
export const { setAvatarUrl, setRoleName } = slice.actions;

// Thunks
import axios from 'utils/axios';

export function getUsers() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/users/all');
            dispatch(slice.actions.getUsersReviewSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// Fetch user role and update the state
export function fetchUserRole() {
    return async (dispatch) => {
        try {
            const response = await axios.get('/me');
            const role_name = response.data.data.role_name;
            dispatch(slice.actions.setRoleName(role_name));
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };
}
