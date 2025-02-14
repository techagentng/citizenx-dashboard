// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    rewardData: [],
    totalQuantity: 0, 
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
        },

        setTotalQuantity(state, action) {
            state.totalQuantity = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;
export const { setTotalQuantity } = slice.actions;
// ----------------------------------------------------------------------

export function getAllRewards() {
    return async () => {
        try {
            const response = await axios.get('/count/all/rewards');
            dispatch(slice.actions.getRewardSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
