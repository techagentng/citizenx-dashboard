import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit'; // Ensure you have @reduxjs/toolkit installed

// Define your slice (adjust the name and initial state as needed)
const slice = createSlice({
    name: 'ratings',
    initialState: {
        ratings: null,
        error: null
    },
    reducers: {
        getRatingsSuccess(state, action) {
            state.ratings = action.payload;
        },
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { getRatingsSuccess, hasError } = slice.actions;

export default slice.reducer;

// Define the async function to fetch ratings
export function getRatings(reportType, state) {
    return async (dispatch) => {
        try {
            const serviceToken = localStorage.getItem('serviceToken');
            if (!serviceToken) {
                throw new Error('No token found');
            }

            const response = await axios.get(`http://localhost:8080/api/v1/report/rating?reportType=${reportType}&state=${state}`, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`
                }
            });

            dispatch(getRatingsSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
