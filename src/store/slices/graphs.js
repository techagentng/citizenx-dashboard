import { createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';

const initialState = {
    error: null,
    graphs: {
        reportTypes: [],
        reportCounts: [],
        total_count: 0,        // Total reports
        total_users: 0,
        total_states: 0,       // Total states
        topStates: []
    },
    lgaState: {
        state: 'Anambra',
        lga: 'Aguata'
    },
    reportPercent: {
        good_percentage: 0,
        bad_percentage: 0
    },
    reportCount: 0,
    loading: false,
    reportType: ''
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
            state.graphs.reportTypes = action.payload.report_types || [];
            state.graphs.reportCounts = action.payload.report_counts || [];
            state.graphs.total_count = action.payload.total_count || 0;
            state.graphs.total_users = action.payload.total_users || 0;
            state.graphs.topStates = action.payload.top_states || [];
            state.graphs.total_states = action.payload.total_states || 0;
            state.loading = false;
        },
        getPercentCountSuccess(state, action) {
            state.reportPercent = action.payload;
        },
        setTotalStates(state, action) {
            state.graphs.total_states = action.payload;
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

export const {
    getGraphStart,
    hasError,
    getGraphSuccess,
    getPercentCountSuccess,
    setState,
    setLga,
    setReportType,
    setTotalStates
} = slice.actions;

// ==================== ASYNC THUNKS ====================

export function fetchTotalStates() {
    return async (dispatch) => {
        dispatch(getGraphStart());
        try {
            const response = await axios.get('/reports/states/top');
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function getGraph(state, lga, startDate, endDate) {
    return async (dispatch) => {
        dispatch(getGraphStart());
        try {
            let url = `/report/type/count?state=${state}&lga=${lga}`;
            if (startDate && endDate) {
                // Ensure dates are formatted as YYYY-MM-DD
                const formatDate = (date) => {
                    if (!date) return '';
                    if (typeof date === 'string') return date.slice(0, 10); // fallback if already string
                    return date.toISOString().slice(0, 10);
                };
                url += `&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`;
            }
            const response = await axios.get(url);
            dispatch(getGraphSuccess(response?.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function getReportCount() {
    return async (dispatch) => {
        dispatch(getGraphStart());
        try {
            const response = await axios.get('/incident_reports');
            dispatch(getGraphSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function getPercentCount(reportType, state) {
    return async (dispatch) => {
        try {
            const response = await axios.get('/report/rating', {
                params: { reportType, state }
            });
            dispatch(getPercentCountSuccess(response.data));
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}
