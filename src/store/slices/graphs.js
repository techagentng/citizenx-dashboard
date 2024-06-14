import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';

const initialState = {
    error: null,
    graphs: {
        reportTypes: [],
        reportCounts: [],
    },
    loading: false,
};

const slice = createSlice({
    name: 'graphs',
    initialState,
    reducers: {
        getGraphStart(state) {
            state.loading = true;
        },
        hasError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        getGraphSuccess(state, action) {
            state.graphs.reportTypes = action.payload.report_types;
            state.graphs.reportCounts = action.payload.report_counts;
            state.loading = false;
        },
    }
});

export default slice.reducer;

export const { getGraphStart, hasError, getGraphSuccess } = slice.actions;

export function getGraph(state, lga) {
    return async () => {
        dispatch(getGraphStart());
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/report/type/count?state=${state}&lga=${lga}`);
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
