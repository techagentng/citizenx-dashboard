import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';

const initialState = {
    error: null,
    graphs: {
        reportTypes: [],
        reportCounts: [],
    },
    lgaState: {
        state: "",
        lga: "",
    },
    loading: false
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
        setState(state, action) {
            state.lgaState.state = action.payload;
        },
        setLga(state, action) {
            state.lgaState.lga = action.payload;
        }
    }
});

export default slice.reducer;

export const { getGraphStart, hasError, getGraphSuccess, setState, setLga } = slice.actions;

export function getGraph(state, lga, startDate, endDate) {
    return async () => {
        dispatch(getGraphStart());
        try {
            let url = `/report/type/count?state=${state}&lga=${lga}`;
            if (startDate && endDate) {
                url += `&startDate=${startDate}&endDate=${endDate}`;
            }
            const response = await axios.get(url);
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
