// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    rewardData: []
};

const slice = createSlice({
    name: 'reward',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET REWARDS
        getRewardSuccess(state, action) {
            state.rewardData = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAllRewards() {
    return async () => {
        try {
            const response = await axios.get('/rewards/list');
            dispatch(slice.actions.getRewardSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
