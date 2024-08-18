import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    users: [],
    avatarUrl: '', 
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
        }
    }
});

export default slice.reducer;

// Actions
export const { setAvatarUrl } = slice.actions;

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
