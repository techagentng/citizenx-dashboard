import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { dispatch } from '../index';

const initialState = {
    error: null,
    graphs: {
        reportTypes: [],
        reportCounts: [],
        total_count: 0 
    },
    lgaState: {
        state: '',
        lga: ''
    },
    reportPercent: {
        good_percentage: 0,
        bad_percentage: 0
    },
    reportCount: 0,
    loading: false,
    topStates: {},
    total_users: 0
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
            state.graphs.total_count = action.payload.total_count;
            (state.graphs.topStates = action.payload.top_states), (state.loading = false);
            state.graphs.total_users = action.payload.total_users;
        },
        getPercentCountSuccess(state, action) {
            state.reportPercent = action.payload;
        },
        setState(state, action) {
            state.lgaState.state = action.payload;
        },
        setLga(state, action) {
            state.lgaState.lga = action.payload;
        },
        setReportType(state, action) {
            state.reportType = action.payload;
        }
    }
});

export default slice.reducer;

export const { getGraphStart, hasError, getGraphSuccess, getPercentCountSuccess, setState, setLga, setReportType } = slice.actions;

export function getGraph(state, lga, startDate, endDate) {
    return async (dispatch) => { // Added dispatch parameter for clarity
        dispatch(getGraphStart());
        try {
            let url = `/report/type/count?state=${state}&lga=${lga}`;
            // Use snake_case to match backend
            if (startDate) {
                url += `&start_date=${startDate}`;
            }
            if (endDate) {
                url += `&end_date=${endDate}`;
            }
            const response = await axios.get(url);
            dispatch(getGraphSuccess(response?.data));
        } catch (error) {
            dispatch(hasError(error.response?.data?.error || error.message));
        }
    };
}

export function getReportCount() {
    return async () => {
        dispatch(getGraphStart());
        try {
            let url = `/incident_reports`;
            const response = await axios.get(url);
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function getPercentCount(reportType, state) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/report/rating`, {
                params: {
                    reportType,
                    state
                }
            });
            dispatch(slice.actions.getPercentCountSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
